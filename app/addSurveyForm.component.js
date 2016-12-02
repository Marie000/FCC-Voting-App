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
var forms_1 = require("@angular/forms");
var survey_service_1 = require("./services/survey.service");
var AddSurveyForm = (function () {
    function AddSurveyForm(fb, surveyService) {
        this.fb = fb;
        this.surveyService = surveyService;
        this.submitted = false;
        this.options = [];
    }
    AddSurveyForm.prototype.ngOnInit = function () {
        this.createSurveyForm = this.fb.group({
            title: ['', [forms_1.Validators.required]],
        });
        this.addOptionForm = this.fb.group({
            newOption: ['', [forms_1.Validators.required]]
        });
    };
    AddSurveyForm.prototype.onCreateSurvey = function (event, value, valid) {
        event.preventDefault();
        if (event.defaultPrevented) {
            this.submitted = true;
            if (valid) {
                var newSurvey = {
                    title: value.title,
                    options: this.options
                };
                this.surveyService.saveSurvey(newSurvey, this.token).subscribe(function (survey) {
                    console.log('survey: ' + survey);
                }, function (error) {
                    console.log(error);
                });
                this.submitted = false;
                this.createSurveyForm.reset();
                this.options = [];
            }
        }
    };
    AddSurveyForm.prototype.onAddOption = function (event, value, valid) {
        event.preventDefault();
        if (valid) {
            this.options.push({ text: value.newOption, count: 0 });
            this.addOptionForm.reset();
        }
    };
    return AddSurveyForm;
}());
__decorate([
    core_1.Input('token'),
    __metadata("design:type", Object)
], AddSurveyForm.prototype, "token", void 0);
AddSurveyForm = __decorate([
    core_1.Component({
        selector: 'add-survey-form',
        providers: [survey_service_1.SurveyService],
        template: "\n    <p>This is the add survey form</p>\n    <form class=\"form-control\" \n          [formGroup]=\"createSurveyForm\"\n          (ngSubmit)=\"onCreateSurvey($event,createSurveyForm.value, createSurveyForm.valid)\" >\n    \n          <input class=\"form-control\"\n                 type=\"text\"\n                 formControlName=\"title\"\n                 placeholder=\"survey title / question\"\n                 name=\"title\" />\n           <ul>      \n          <li *ngFor=\"let option of options\">\n                {{option.text}}\n          </li>\n          </ul>\n          \n          <form class=\"form-control\"\n                [formGroup]=\"addOptionForm\"\n                (ngSubmit)=\"onAddOption($event, addOptionForm.value, addOptionForm.valid)\">\n                \n             <input class=\"form-control\"\n                    type=\"text\"\n                    formControlName=\"newOption\"\n                    placeholder=\"option\"\n                    name=\"newOption\" />\n                    \n             <input type=\"submit\" value=\"submit option\" />\n          </form>\n          \n           \n          <input type=\"submit\"/>\n    </form>\n    \n    "
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, survey_service_1.SurveyService])
], AddSurveyForm);
exports.AddSurveyForm = AddSurveyForm;
//# sourceMappingURL=addSurveyForm.component.js.map