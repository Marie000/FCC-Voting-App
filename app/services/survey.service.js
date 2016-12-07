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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var apiUrl = 'http://localhost:9000/api';
var SurveyService = (function () {
    function SurveyService(http) {
        this.http = http;
    }
    SurveyService.prototype.getSurveys = function () {
        return this.http.get(apiUrl + '/surveys')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.error || 'Server error'); });
    };
    SurveyService.prototype.getSurvey = function (id) {
        return this.http.get(apiUrl + '/surveys/' + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); });
    };
    SurveyService.prototype.saveSurvey = function (newSurvey, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-auth': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(apiUrl + '/surveys', JSON.stringify(newSurvey), options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return console.log(error || 'Server error'); });
    };
    SurveyService.prototype.saveOption = function (survey_id, option_id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(apiUrl + '/surveys/' + survey_id + '/options/' + option_id, {}, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return console.log(error || 'Server error'); });
    };
    SurveyService.prototype.deleteSurvey = function (survey_id, token) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', 'x-auth': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(apiUrl + '/surveys/' + survey_id, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return console.log(error || 'Server error'); });
    };
    SurveyService.prototype.addNewOption = function (survey_id, body) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(apiUrl + '/surveys/' + survey_id + '/options', body, options)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return console.log(error || 'Server error'); });
    };
    return SurveyService;
}());
SurveyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SurveyService);
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.service.js.map