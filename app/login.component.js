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
var emailRegEx = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
var Login = (function () {
    function Login(fb) {
        this.fb = fb;
        this.signup = false;
        this.dashboard = false;
        this.user = {};
        this.submitted = false;
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
            name: ['', [forms_1.Validators.required]],
            password: ['', [forms_1.Validators.required]],
            password2: ['', [forms_1.Validators.required]]
        });
        // this.users = this.UserService.getData();
    };
    Login.prototype.onCreateUser = function (user, valid) {
        this.submitted = true;
        if (valid) {
            if (user.password === user.password2) {
                console.log('passwords match');
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
    Login.prototype.onLogin = function (value, valid) {
        this.submitted = true;
        if (valid) {
            console.log('check for login');
        }
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        template: "\n<h1>Login or sign up</h1>\n  <div *ngIf=\"!dashboard\">\n    <div *ngIf=\"signup\">   <button class=\"btn btn-default\" (click)=\"toggleForms()\">LogIn</button> </div>\n    <div *ngIf=\"!signup\">   <button class=\"btn btn-default\" (click)=\"toggleForms()\">Create a user</button> </div>\n\n    <div *ngIf=\"signup\">\n        <h3>SignUp Page</h3>\n        <form class=\"form-group\" [formGroup]=\"createUserForm\" (ngSubmit)=\"onCreateUser(createUserForm.value,createUserForm.valid)\">\n            <input class=\"form-control\" type=\"text\" formControlName=\"email\" placeholder=\"email\" name=\"email\"/>\n            <small *ngIf=\"!createUserForm.controls.email.valid && submitted\">Valid email is mandatory</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password\" placeholder=\"password\" name=\"password\"/>\n            <small *ngIf=\"!createUserForm.controls.password.valid && submitted\">Please enter a password - minimum 5 characters</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password2\" placeholder=\"retype password\" name=\"password2\"/>\n            <small *ngIf=\"!createUserForm.controls.password2.valid && submitted\">Please re-enter your password</small>\n            <input type=\"submit\" class=\"form-control btn btn-default\" value=\"Submit\" />\n        </form>\n    </div>\n        \n    <div *ngIf=\"!signup\">\n        <h3>LogIn</h3>\n        <form [formGroup]=\"signInForm\" (ngSubmit)=\"onLogin(signInForm.value,signInForm.valid)\" class=\"form-group\">\n            <input class=\"form-control\" type=\"text\" formControlName=\"email\" placeholder=\"email\" />\n            <small *ngIf=\"!signInForm.controls.email.valid && submitted\">Valid email is mandatory</small>\n            <input class=\"form-control\" type=\"password\" formControlName=\"password\" placeholder=\"password\" />\n            <input type=\"submit\" class=\"form-control btn btn-default\" value=\"Submit\"/>\n        </form>\n    </div>\n        \n  </div>\n        <div *ngIf=\"dashboard\">\n            <button (click)=\"logout()\" class=\"logout-button btn btn-default\">Log out</button>\n            <h1>Dashboard tag goes here</h1>\n        </div>\n"
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], Login);
exports.Login = Login;
//# sourceMappingURL=login.component.js.map