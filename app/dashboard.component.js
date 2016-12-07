"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var survey_service_1 = require("./services/survey.service");
var addSurveyForm_component_1 = require("./addSurveyForm.component");
var Dashboard = (function () {
    function Dashboard(surveyService) {
        var _this = this;
        this.surveyService = surveyService;
        this.surveys = [{ 'title': 'not loaded yet' }];
        this.surveyService.getSurveys().subscribe(function (surveys) { return _this.surveys = surveys; });
    }
    Dashboard.prototype.refreshList = function () {
        var _this = this;
        this.surveyService.getSurveys().subscribe(function (surveys) { return _this.surveys = surveys; });
    };
    return Dashboard;
}());
__decorate([
    core_1.Input('private'),
    __metadata("design:type", Object)
], Dashboard.prototype, "private", void 0);
__decorate([
    core_1.Input('token'),
    __metadata("design:type", Object)
], Dashboard.prototype, "token", void 0);
__decorate([
    core_1.Input('user'),
    __metadata("design:type", Object)
], Dashboard.prototype, "user", void 0);
Dashboard = __decorate([
    core_1.Component({
        selector: 'dashboard',
        viewBindings: [survey_service_1.SurveyService],
        directives: [addSurveyForm_component_1.AddSurveyForm],
        template: "\n        <h1>\n        <span *ngIf=\"!private\">Public</span>\n         <span *ngIf=\"private\">Private</span>\n         dashboard</h1>\n         \n         <!--View List of surveys-->\n         \n         <ul materialize=\"collapsible\" class=\"collapsible\" data-collapsible=\"accordion\" *ngFor=\"let survey of surveys\">\n           <li>\n           <div class=\"collapsible-header\"><h2>{{survey.title}}</h2></div>\n           <div class=\"collapsible-body\">\n           <survey [survey]=\"survey\" [user]=\"user\" [token]=\"token\" (onDelete)=\"refreshList()\"></survey>\n</div>\n           </li>\n           \n         </ul>\n         \n         <!--Create a survey-->\n         <div *ngIf=\"private\" class=\"add-survey-form\">\n         <h2>Create a survey</h2>\n         <add-survey-form [token]=\"token\" (onNewSurvey)=\"refreshList()\"></add-survey-form>\n        </div>\n\n    "
    }),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], Dashboard);
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map