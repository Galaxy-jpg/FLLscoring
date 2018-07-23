'use strict'

const express = require('express')
const Promise = require('bluebird')
const { MongoClient, ObjectID } = require('mongodb')
const { authroizationMiddlware } = require('@first-lego-league/ms-auth')
const Configuration = require('@first-lego-league/ms-configuration')

const DEFAULTS = require('./defaults')

const mongoUrl = process.env.MONGO_URI || DEFAULTS.MONGO

const router = express.Router()

const STATUS = {
  GOOD: 'ok',
  CONFIGURATION_ERROR: 'config-error',
  LOUD_FAIL: 'loud-fail'
}

const connectionPromise = MongoClient
  .connect(mongoUrl, { promiseLibrary: Promise, useNewUrlParser: true })
  .then(client => client.db().collection('scores'))

function _validateScore (score) {
  let retError = { 'status': STATUS.GOOD, 'errors': '' }

  Configuration.get('autoPublish').then(autoPublishSetting => {
    const publishBool = autoPublishSetting
    return publishBool
  }).then(result => {
    score.published = result
  }).catch(() => {
    retError.status = STATUS.CONFIGURATION_ERROR
    return retError
  })

  if (typeof score.teamNumber !== 'number') { retError.errors += 'team number ' }
  if (score.score == null) { retError.errors += 'score ' }
  if (score.match == null) { retError.errors += 'match ' }

  if (retError.errors !== STATUS.GOOD) { retError.status = STATUS.LOUD_FAIL }

  return retError
}

const adminAction = authroizationMiddlware(['admin', 'scorekeeper', 'development'])

router.post('/create', (req, res) => {
  const scoreValidation = _validateScore(req.body)

  if (scoreValidation.status === STATUS.GOOD) {
    connectionPromise
      .then(scoringCollection => {
        scoringCollection.save(req.body)
      })
      .then(() => {
        res.status(201).send()
      })
      .catch(err => {
        req.logger.error(err.message)
        res.status(500).send('A problem occoured while trying to save score.')
      })
  } else {
    req.logger.error('Invalid score, missing ' + scoreValidation.errors + '. ' + scoreValidation.status + '.')
    res.status(422).send('Invalid score, missing ' + scoreValidation.errors)
  }
})

router.post('/:id/update', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.update({ _id: new ObjectID(req.params.id) }, { $set: req.body }))
    .then(() => res.status(204).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to update score ${req.params.id}.`)
    })
})

router.delete('/:id/delete', adminAction, (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.deleteOne({ _id: new ObjectID(req.params.id) }))
    .then(() => res.status(204).send())
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to delete score ${req.params.id}.`)
    })
})

router.get('/all', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.find().toArray())
    .then(scores => res.status(201).send(scores))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send('A problem occoured while trying to get scores.')
    })
})

router.get('/:id', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.findOne({ _id: new ObjectID(req.params.id) }))
    .then(score => res.status(200).json(score))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(`A problem occoured while trying to get score ${req.params.id}.`)
    })
})

router.get('/search', (req, res) => {
  connectionPromise
    .then(scoringCollection => scoringCollection.findOne(req.query))
    .then(score => res.status(200).json(score))
    .catch(err => {
      req.logger.error(err.message)
      res.status(500).send(err)
    })
})

// eslint-disable-next-line node/exports-style
module.exports = router
