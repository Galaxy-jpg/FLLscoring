'use strict'

export default {
	template: `
	<div class="top-bar secondary">
		<div class="top-bar-left">
			<identity></identity>
		</div>
		<div class="top-bar-right">
			<div id="score-diff-animation" ng-show="scoresheet.showScoreDiffAnimation">{{scoresheet.scoreDiff}}</div>
			<div class="button-group">
				<div class="hollow button">{{scoresheet.score()}} pts.</div>
				<div class="button" ng-click="scoresheet.setDefault()"><i class="fa fa-arrow-down"></i></div>
				<div class="button" ng-click="scoresheet.reset()"><i class="fa fa-undo"></i></div>
			</div>
		</div>
	</div>
	<div class="top-bar-page">
		<div class="grid-container">
			<div class="grid-x grid-padding-x grid-padding-y">
				<div class="cell">
					<div id="{{mission.id}}" class="callout" ng-class="{ success: mission.complete, alert: mission.error }" ng-repeat="mission in scoresheet.missions" >
						<mission data="mission"></mission>
					</div>
				</div>
				<div class="cell">
					<div id="signature" class="callout">
						<signature-pad accept="getSignature" clear="clearSignature" height="128" width="300" disabled="false"  ng-hide="scoresheet.scoresheet._id" ></signature-pad>
						<img ng-src="{{scoresheet.scoresheet.signature.dataUrl}}" ng-show="scoresheet.scoresheet._id" />
					</div>
				</div>
				<div class="cell small-2 small-offset-5">
					<div class="large button" ng-click="scoresheet.save()" ng-disabled="!scoresheet.complete()">Submit</div>
				</div>
			</div>
		</div>
	</div>`,
	controller: 'ScoresheetController as scoresheet',
}