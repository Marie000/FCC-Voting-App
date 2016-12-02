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
var Survey = (function () {
    function Survey(surveyService) {
        this.surveyService = surveyService;
        this.open = false;
        this.options = [];
    }
    Survey.prototype.toggleSurvey = function () {
        this.open = !this.open;
    };
    Survey.prototype.changeOption = function (event, option) {
        if (event.target.checked) {
            this.options.push(option);
        }
        else {
            var index = this.options.indexOf(option);
            this.options.splice(index, 1);
        }
    };
    Survey.prototype.saveOptions = function () {
        for (var i in this.options) {
            this.surveyService.saveOption(this.survey._id, this.options[i]._id).subscribe(function (survey) {
                console.log('success?');
            }, function (error) {
                console.log(error);
            });
        }
    };
    return Survey;
}());
__decorate([
    core_1.Input('survey'),
    __metadata("design:type", Object)
], Survey.prototype, "survey", void 0);
Survey = __decorate([
    core_1.Component({
        selector: 'survey',
        providers: [survey_service_1.SurveyService],
        template: "\n        <h3 (click)=\"toggleSurvey()\">{{survey.title}}</h3>\n        <div *ngIf=\"open\">\n\n            <div *ngFor=\"let option of survey.options\">\n                    <input type=\"checkbox\"\n               name=option\n               (change)=\"changeOption($event,option)\"\n                />\n                {{option.text}}\n            </div>     \n         <button (click)=\"saveOptions()\">Save</button>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], Survey);
exports.Survey = Survey;
//# sourceMappingURL=survey.component.js.map