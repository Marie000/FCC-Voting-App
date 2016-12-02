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
var user_service_1 = require("./services/user.service");
var survey_service_1 = require("./services/survey.service");
var emailRegEx = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
var Login = (function () {
    function Login(fb, userService, surveyService) {
        this.fb = fb;
        this.userService = userService;
        this.surveyService = surveyService;
        this.signup = false;
        this.dashboard = false;
        this.user = {};
        this.submitted = false;
        this.loggedIn = false;
        this.token = '';
        this.loggedInUser = '';
    }
    Login.prototype.ngOnInit = function () {
        //signIn form controller
        this.signInForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(emailRegEx)]],
            password: ['']
        });
        //create user form controller
        this.createUserForm = this.fb.group({
            email: ['', [forms_1.Validators.required, forms_1.Validators.pattern(emailRegEx)]],
            password: ['', [forms_1.Validators.required]],
            password2: ['', [forms_1.Validators.required]]
        });
        // this.users = this.UserService.getData();
    };
    Login.prototype.onCreateUser = function (event, user, valid) {
        var _this = this;
        event.preventDefault();
        this.submitted = true;
        if (valid) {
            if (user.password === user.password2) {
                var newUser = { email: user.email, password: user.password };
                this.userService.createUser(newUser).subscribe(function (user) {
                    _this.dashboard = true;
                    _this.loggedIn = true;
                }, function (error) {
                    console.log('there was an error: ');
                    console.log(error);
                });
            }
            else {
                console.log("passwords must match");
            }
        }
    };
    Login.prototype.toggleForms = function () {
        this.signup = !this.signup;
    };
    Login.prototype.logout = function () {
        this.dashboard = false;
        this.signup = false;
    };
    Login.prototype.openLogin = function () {
        this.dashboard = false;
        this.signup = false;
    };
    Login.prototype.onLogin = function (event, value, valid) {
        var _this = this;
        event.preventDefault();
        this.submitted = true;
        if (valid) {
            var body = { email: value.email, password: value.password };
            this.userService.login(body).subscribe(function (user) {
                // this.getSurveys();
                _this.loggedIn = true;
                _this.dashboard = true;
                _this.token = user.tokens[0].token;
                _this.loggedInUser = user;
                console.log(_this.token);
            }, function (error) {
                console.log(error);
            });
            console.log('check for login');
        }
    };
    Login.prototype.accessPublicDashboard = function () {
        this.dashboard = true;
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        providers: [user_service_1.UserService, survey_service_1.SurveyService],
        template: "\n  <div *ngIf=\"!dashboard\">\n  <h1>Login or sign up</h1>\n    <div *ngIf=\"signup\">   <button class=\"btn btn-default\" (click)=\"toggleForms()\">LogIn</button> </div>\n    <div *ngIf=\"!signup\">   <button class=\"btn btn-default\" (click)=\"toggleForms()\">Create a user</button> </div>\n\n    <div *ngIf=\"signup\">\n        <h3>SignUp Page</h3>\n        <form class=\"form-group\" [formGroup]=\"createUserForm\" (ngSubmit)=\"onCreateUser($event,createUserForm.value,createUserForm.valid)\">\n            <input class=\"form-control\" type=\"text\" formControlName=\"email\" placeholder=\"email\" name=\"email\"/>\n            <small *ngIf=\"!createUserForm.controls.email.valid && submitted\">Valid email is mandatory</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password\" placeholder=\"password\" name=\"password\"/>\n            <small *ngIf=\"!createUserForm.controls.password.valid && submitted\">Please enter a password - minimum 5 characters</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password2\" placeholder=\"retype password\" name=\"password2\"/>\n            <small *ngIf=\"!createUserForm.controls.password2.valid && submitted\">Please re-enter your password</small>\n            <input type=\"submit\" class=\"form-control btn btn-default\" value=\"Submit\" />\n        </form>\n    </div>\n        \n    <div *ngIf=\"!signup\">\n        <h3>LogIn</h3>\n        <form [formGroup]=\"signInForm\" (ngSubmit)=\"onLogin($event,signInForm.value,signInForm.valid)\" class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" formControlName=\"email\" placeholder=\"email\" />\n            <small *ngIf=\"!signInForm.controls.email.valid && submitted\">Valid email is mandatory</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password\" placeholder=\"password\" />\n            <input type=\"submit\" class=\"form-control btn btn-default\" value=\"Submit\"/>\n        </form>\n    </div>\n        <button (click)=\"accessPublicDashboard()\">Enter as a guest</button>\n  </div>\n        <div *ngIf=\"dashboard\">\n            <div *ngIf=\"loggedIn\">\n            <button (click)=\"logout()\" class=\"logout-button btn btn-default\">Log out</button>\n            </div>\n            \n            <div *ngIf=\"!loggedIn\">\n            <button (click)=\"openLogin()\" class=\"logout-button btn btn-default\">Return to Log in page</button>\n            </div>\n            \n            <dashboard [user]='loggedInUser' [token]=\"token\" [private]=\"loggedIn\" ></dashboard>\n        </div>\n"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, survey_service_1.SurveyService])
], Login);
exports.Login = Login;
//# sourceMappingURL=login.component.js.map