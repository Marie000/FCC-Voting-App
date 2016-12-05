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
        this.newOption = '';
        this.mySurvey = false;
        this.open = false;
        this.results = false;
        this.options = [];
    }
    Survey.prototype.ngOnInit = function () {
        if (this.user) {
            if (this.user._id.toString() === this.survey._creator.toString()) {
                this.mySurvey = true;
            }
        }
    };
    Survey.prototype.toggleSurvey = function () {
        this.open = !this.open;
        this.results = false;
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
        console.log(this.newOption);
        if (this.newOption) {
            this.surveyService.addNewOption(this.survey._id, { 'text': this.newOption, 'count': 1 }).subscribe(function (survey) {
                console.log('new option added');
            });
        }
        for (var i in this.options) {
            this.surveyService.saveOption(this.survey._id, this.options[i]._id).subscribe(function (survey) {
                console.log('success?');
            }, function (error) {
                console.log(error);
            });
        }
        this.open = false;
        this.results = true;
    };
    Survey.prototype.deleteSurvey = function () {
        this.surveyService.deleteSurvey(this.survey._id, this.token).subscribe(function (survey) {
            console.log('deleted');
        }, function (error) {
            console.log(error);
        });
    };
    Survey.prototype.showResults = function () {
        this.results = !this.results;
        this.open = false;
    };
    return Survey;
}());
__decorate([
    core_1.Input('survey'),
    __metadata("design:type", Object)
], Survey.prototype, "survey", void 0);
__decorate([
    core_1.Input('user'),
    __metadata("design:type", Object)
], Survey.prototype, "user", void 0);
__decorate([
    core_1.Input('token'),
    __metadata("design:type", Object)
], Survey.prototype, "token", void 0);
Survey = __decorate([
    core_1.Component({
        selector: 'survey',
        providers: [survey_service_1.SurveyService],
        template: "\n        <li>\n        <div class=\"collapsible-header\">\n        <h3>{{survey.title}}</h3>\n        </div>\n        <div class=\"collapsible-body\">\n\n        <button (click)=\"showResults()\" class=\"btn\">\n        <span *ngIf=\"results\">Hide Results</span><span *ngIf=\"!results\">Show Results</span>\n        </button>\n        <button *ngIf='mySurvey' class=\"btn\" (click)=\"deleteSurvey()\">Delete</button>\n        <div >\n\n            <div *ngFor=\"let option of survey.options\">\n                    <input type=\"checkbox\"\n               name=option\n               (change)=\"changeOption($event,option)\"\n               id={{option._id}}\n                />\n                <label for={{option._id}}>{{option.text}}</label>\n            </div>   \n            <div class=\"input-field\">\n            <input type=\"text\" [(ngModel)]=\"newOption\" placeholder=\"enter another option here\" />\n            </div>\n         <button (click)=\"saveOptions()\" class=\"btn\">Save</button>\n        </div>\n        <div *ngIf=\"results\">\n            <div *ngFor=\"let option of survey.options\">\n            {{option.text}}: {{option.count}}\n            </div>\n        </div>\n        </div>\n        </li>\n\n    "
    }),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], Survey);
exports.Survey = Survey;
//# sourceMappingURL=survey.component.js.map