class MetadataInputsController {
  constructor (scoresheet, scores, $scope, tournament, messanger, logger) {
    Object.assign(this, { data: scoresheet, scores, $scope, tournament, messanger, logger })
    this.loading = true
  }

  $onInit () {
    this.$scope.$watch(() => this.teamNumber(), () => this.loadMatchOptions())

    this.messanger.on('scores:reload', () => this.loadMatchOptions())

    this.$scope.$watch(() => this.data.current.matchId, () => {
      if (this.data.current.matchId) {
        if (this.matches) {
          this.setMatch()
          return this.data.process({ cantLoadMatches: this.cantLoadMatches })
            .catch(err => this.logger.error(err))
        } else {
          this.data.current.matchId = undefined
        }
      }
    })

    this.$scope.$on('reset', ({ forceMetadataIfEditing }) => {
      if (forceMetadataIfEditing || !this.data.isEditing()) {
        this.matches = []
      }
    })

    return this.tournament.loadTeams()
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

  loadMatchOptions () {
    if (this.teamNumber()) {
      this.loadingMatches = true
      Promise.all([this.tournament.loadTeamMatches(this.teamNumber()), this.scores.init()])
        .then(([matches]) => {
          const scores = this.scores.all()
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
MetadataInputsController.$inject = ['Scoresheet', 'Scores', '$scope', 'Tournament', 'Messanger', 'Logger']

export default MetadataInputsController
