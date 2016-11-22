import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from './models/user.model';

const emailRegEx = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

@Component({
    selector: 'login',
    template: `
<h1>Login or sign up</h1>
  <div *ngIf="!dashboard">
    <div *ngIf="signup">   <button class="btn btn-default" (click)="toggleForms()">LogIn</button> </div>
    <div *ngIf="!signup">   <button class="btn btn-default" (click)="toggleForms()">Create a user</button> </div>

    <div *ngIf="signup">
        <h3>SignUp Page</h3>
        <form class="form-group" [formGroup]="createUserForm" (ngSubmit)="onCreateUser(createUserForm.value,createUserForm.valid)">
            <input class="form-control" type="text" formControlName="email" placeholder="email" name="email"/>
            <small *ngIf="!createUserForm.controls.email.valid && submitted">Valid email is mandatory</small>
            <input class="form-control" type="password" formControlName="password" placeholder="password" name="password"/>
            <small *ngIf="!createUserForm.controls.password.valid && submitted">Please enter a password - minimum 5 characters</small>
            <input class="form-control" type="password" formControlName="password2" placeholder="retype password" name="password2"/>
            <small *ngIf="!createUserForm.controls.password2.valid && submitted">Please re-enter your password</small>
            <input type="submit" class="form-control btn btn-default" value="Submit" />
        </form>
    </div>
        
    <div *ngIf="!signup">
        <h3>LogIn</h3>
        <form [formGroup]="signInForm" (ngSubmit)="onLogin(signInForm.value,signInForm.valid)" class="form-group">
            <input class="form-control" type="text" formControlName="email" placeholder="email" />
            <small *ngIf="!signInForm.controls.email.valid && submitted">Valid email is mandatory</small>
            <input class="form-control" type="password" formControlName="password" placeholder="password" />
            <input type="submit" class="form-control btn btn-default" value="Submit"/>
        </form>
    </div>
        
  </div>
        <div *ngIf="dashboard">
            <button (click)="logout()" class="logout-button btn btn-default">Log out</button>
            <h1>Dashboard tag goes here</h1>
        </div>
`
})
export class Login {

    constructor(public fb: FormBuilder){}
    signInForm:FormGroup;
    createUserForm:FormGroup;
    users:User[];
    ngOnInit(){
        //signIn form controller
        this.signInForm = this.fb.group({
            email:['',[Validators.required,Validators.pattern(emailRegEx)]],
            password:['']
        })
        //create user form controller
        this.createUserForm = this.fb.group({
            email:['',[Validators.required,Validators.pattern(emailRegEx)]],
            name:['',[Validators.required]],
            password:['',[Validators.required]],
            password2:['',[Validators.required]]
        });
       // this.users = this.UserService.getData();
    }

    signup=false;
    dashboard=false;
    user={};
    submitted=false;

    onCreateUser(user,valid) {
        this.submitted = true;
        if (valid) {
            if (user.password === user.password2) {
                console.log('passwords match')
            } else {
                console.log("passwords must match")
            }
        }
    }
    toggleForms(){
        this.signup=!this.signup;
    }
    logout() {
        this.dashboard=false;
        this.signup=false;
    }

    onLogin(value,valid) {
        this.submitted = true;
        if (valid) {
            console.log('check for login')
        }
    }

}