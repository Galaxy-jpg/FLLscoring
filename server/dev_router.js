'use strict'

const express = require('express')
require('express-csv')

const router = express.Router()

const TEAMS = [
  { number: 1, name: 'The first team' },
  { number: 2, name: 'Two is always together' },
  { number: 8, name: 'Magic 8' },
  { number: 15, name: 'The RoboJars' },
  { number: 54, name: 'What will you get if you multiply six by nine?' },
  { number: 123, name: 'Genesis' },
  { number: 132, name: 'King of Hearts' },
  { number: 173, name: 'The Society of the Blind Eye' },
  { number: 182, name: 'The blue dot' },
  { number: 534, name: 'The Fellowship of the Ring' },
  { number: 856, name: 'The Order of the Phoenix' },
  { number: 956, name: 'ElectroWreckers' },
  { number: 981, name: 'The Green slime club' },
  { number: 2212, name: 'The Spikes' },
  { number: 2468, name: 'Even us' },
  { number: 8846, name: 'Syntax error' }
]

const TABLES = [
  { tableId: 1, tableName: 'Rick' },
  { tableId: 2, tableName: 'Morty' },
  { tableId: 3, tableName: 'Forty Two' },
  { tableId: 4, tableName: 'Beware of the Leopard' }
]

const STAGES = ['practice', 'scoring', 'scoring', 'scoring']
const MATCHES = []

STAGES.forEach((stage, stageIndex) => {
  for (let teamIndex = 0; teamIndex < TEAMS.length; teamIndex += 2) {
    MATCHES.push({
      _id: String(stageIndex * STAGES.length + teamIndex),
      stage,
      matchTeams: [TEAMS[(stageIndex + teamIndex) % TEAMS.length], TEAMS[(stageIndex + teamIndex + 1) % TEAMS.length]]
        .map((team, matchTeamIndex) => ({ teamNumber: team.number, tableId: TABLES[(stageIndex + teamIndex + matchTeamIndex) % TABLES.length].tableId }))
    })
  }
})

router.get('/team/all', (req, res) => {
  res.json(TEAMS)
})

router.get('/table/all', (req, res) => {
  res.json(TABLES)
})

router.get(`/team/:teamNumber/matches`, (req, res) => {
  res.json(MATCHES.filter(match => match.matchTeams.some(matchTeam => matchTeam.teamNumber === parseInt(req.params.teamNumber))))
})

router.get(`/rankings.csv`, (req, res) => {
  const headers = ['rank', 'team', 'highest', '1', '2', '3']
  res.csv([headers].concat(TEAMS.map((team, index) => {
    const scores = [true, true, true].map(() => Math.floor(100 * Math.random()))
    const highest = Math.max(scores[0], scores[1], scores[2])
    return [index + 1, team.number, highest].concat(scores)
  })))
})

router.get('/match/upcoming/:count', (req, res) => {
  res.json(MATCHES.slice(0, req.params.count))
})

// eslint-disable-next-line node/exports-style
module.exports = router
