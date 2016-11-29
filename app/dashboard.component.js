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
var Dashboard = (function () {
    //@Input('surveys') surveys;
    function Dashboard(surveyService) {
        this.surveyService = surveyService;
        this.surveys = [{ 'title': 'not loaded yet' }];
        this.surveys = [];
    }
    Dashboard.prototype.ngOnInit = function () {
        this.getSurveys();
    };
    Dashboard.prototype.getSurveys = function () {
        var _this = this;
        this.surveyService.getSurveys().subscribe(function (surveys) {
            _this.surveys = surveys;
            console.log(surveys);
        });
    };
    return Dashboard;
}());
__decorate([
    core_1.Input('private'),
    __metadata("design:type", Object)
], Dashboard.prototype, "private", void 0);
Dashboard = __decorate([
    core_1.Component({
        selector: 'dashboard',
        providers: [survey_service_1.SurveyService],
        template: "\n        <h1>This is the \n        <span *ngIf=\"!private\">Public</span>\n         <span *ngIf=\"private\">Private</span>\n         dashboard</h1>\n         \n         <!--View List of surveys-->\n         <h2>List of surveys</h2>\n         <ul>\n         <li *ngFor=\"let survey of surveys\">{{survey.title}}</li>\n         </ul>\n         <!--Create a survey-->\n         <div *ngIf=\"private\">\n         <h2>Create a survey</h2>\n        </div>\n\n    "
    }),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], Dashboard);
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.component.js.map