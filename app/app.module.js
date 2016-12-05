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
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login.component");
var dashboard_component_1 = require("./dashboard.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var addSurveyForm_component_1 = require("./addSurveyForm.component");
var survey_component_1 = require("./survey.component");
var angular2_materialize_1 = require("angular2-materialize");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule],
        declarations: [app_component_1.AppComponent, login_component_1.Login, dashboard_component_1.Dashboard, addSurveyForm_component_1.AddSurveyForm, survey_component_1.Survey, angular2_materialize_1.MaterializeDirective],
        bootstrap: [app_component_1.AppComponent],
        directives: []
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map