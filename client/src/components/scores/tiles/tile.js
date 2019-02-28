export default {
  template: `
<div class="card" ng-class="{ loading: !score.data.ready }">
  <div class="dimmer">
    <div class="big loader"></div>
  </div>

  <div class="card-section">
    <div>
      <h4>
        <a editable-select="score.data.teamNumber" buttons="no" blur="submit" onaftersave="score.updateMatch()" e-ng-options="team.number as team.displayText for team in score.tournament.teams">
          <div ng-class="{'card-section alert' : score.data.teamNumberError}">{{ score.data.teamText }}</div>
        </a>
      </h4>
      <h6 class="align-justify align-middle grid-x subheader">
        <a editable-select="score.data.matchId" buttons="no" blur="submit" onaftersave="score.setMatch()" e-ng-options="match._id as match.displayText for match in score.data.matches">
          <div ng-class="{'card-section alert' : score.data.matchError}">{{ score.data.matchText }}</div>
        </a>
        <small>{{ score.data.dateText }}</small>
      </h6>
    </div>
  </div>

  <div class="stat text-center">
    <a editable-number="score.data.score" buttons="no" blur="submit" onaftersave="score.save()">
      {{ score.data.scoreText }}
    </a>
  </div>

  <div class="card-divider">
    <a editable-text="score.data.referee" buttons="no" blur="submit" onaftersave="score.save()">
      {{ score.data.referee || 'No one' }}
    </a>
    <span ng-if="!score.tournament.tablesDisabled">
      &#160;on table&#160;
      <a editable-select="score.data.tableId" buttons="no" blur="submit" onaftersave="score.save()" e-ng-options="table.tableId as table.tableName for table in score.tournament.tables">
        {{ score.data.tableText }}.
      </a>
    </span>
  </div>

  <div class="card-section flex-child-shrink">
    <score-actions data="score.data"></score-actions>
  </div>

</div>`,
  controller: 'ScoreTileController as score',
  bindings: { data: '=?' }
}
