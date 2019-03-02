class MetadataInputsController {
  constructor (scoresheet, scores, $scope, tournament, refIdentity, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, tournament, refIdentity, logger })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumber(), () => this.autosetSelectedMetadata())
    this.$scope.$on('showing scoresheet', () => this.autosetSelectedMetadata())
    this.refIdentity.on('saved', () => {
      if (this.teamNumber()) {
        this.data.current.teamNumber = undefined
      }
      this.autosetSelectedMetadata()
    })

    this.$scope.$watch(() => this.data.current.matchId, () => {
      if (this.data.current.matchId) {
        if (this.matches.length) {
          return (this.matches ? Promise.resolve() : this.loadMatchOptions())
            .then(() => this.setMatch())
            .then(() => this.data.process({ cantLoadMatches: this.cantLoadMatches }))
            .catch(err => this.logger.error(err))
        } else {
          this.data.current.matchId = undefined
        }
      }
    })

    this.$scope.$on('reset', ({ forceMetadataIfEditing }) => {
      if (forceMetadataIfEditing || !this.data.isEditing()) {
        this.matches = []
        this.autosetSelectedMetadata()
      }
    })

    return this.tournament.loadTeams()
      .then(() => this.refIdentity.init())
      .then(() => this.autosetSelectedMetadata())
  }

  teamNumber () {
    return this.data.current ? this.data.current.teamNumber : undefined
  }

  stage () {
    return this.data.current ? this.data.current.stage : undefined
  }

  round () {
    return this.data.current ? this.data.current.round : undefined
  }

  teams () {
    return (this.tournament.teams || [])
  }

  autosetSelectedMetadata () {
    return this.autoselectTeam()
      .then(() => {
        if (this.teamNumber()) {
          return this.loadMatchOptions()
            .then(() => {
              const firstIncompleteMatch = this.matches.find(match => !match.complete)
              this.data.current.matchId = firstIncompleteMatch ? firstIncompleteMatch._id : undefined
            })
        }
      })
      .then(() => { this.autoselecting = false })
  }

  autoselectTeam () {
    if (this.refIdentity.table && !this.match) {
      this.autoselecting = true
      return this.tournament.loadNextTeamForTable(this.refIdentity.table.tableId, this.data.lastMatchId)
        .then(teamNumber => {
          if (!this.teamNumber() && teamNumber) {
            this.data.current.teamNumber = teamNumber
          }
        })
    } else {
      // Cannot set metadata. No big deal, just continue without autosetting
      return Promise.resolve()
    }
  }

  loadMatchOptions () {
    if (this.teamNumber()) {
      this.loadingMatches = true
      return Promise.all([this.tournament.loadTeamMatches(this.teamNumber()), this.scores.init()])
        .then(([matches]) => {
          const scores = this.scores.scores
          this.data.dontRequireMatch = false
          matches.forEach(match => {
            match.complete = scores.some(score => score.teamNumber === this.teamNumber() && score.matchId === match._id)
            match.displayTextWithCompletion = `${match.displayText} ${match.complete ? '✔' : ''}`
          })
          this.matches = matches

          if (this.stage() && this.round() && !this.match) {
            this.setMatch()
          }
          this.loadingMatches = false
          return this.data.process()
        })
        .catch(err => {
          this.logger.error(err)
          this.loadingMatches = false
          this.data.dontRequireMatch = true
          return this.data.process()
        })
    } else {
      return Promise.resolve()
    }
  }

  setMatch () {
    const match = this.matches.find(m => m._id === this.data.current.matchId) ||
      this.matches.find(m => m.stage === this.stage() && m.round === this.round())
    this.data.current.matchId = match._id
    this.data.current.stage = match.stage
    this.data.current.round = match.round
  }
}

MetadataInputsController.$$ngIsClass = true
MetadataInputsController.$inject = ['Scoresheet', 'Scores', '$scope', 'Tournament', 'RefIdentity', 'Logger']

export default MetadataInputsController
