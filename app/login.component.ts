import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from './models/user.model';
import { UserService } from './services/user.service';
import { SurveyService } from './services/survey.service'

const emailRegEx = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

@Component({
    selector: 'login',
    providers:[UserService, SurveyService],
    template: `
  <div *ngIf="!dashboard">
  <h1>Login or sign up</h1>
    <div *ngIf="signup">   <button class="btn btn-default" (click)="toggleForms()">LogIn</button> </div>
    <div *ngIf="!signup">   <button class="btn btn-default" (click)="toggleForms()">Create a user</button> </div>

    <div *ngIf="signup">
        <h3>SignUp Page</h3>
        <form class="form-group" [formGroup]="createUserForm" (ngSubmit)="onCreateUser($event,createUserForm.value,createUserForm.valid)">
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
        <form [formGroup]="signInForm" (ngSubmit)="onLogin($event,signInForm.value,signInForm.valid)" class="form-group">
            <input class="form-control" type="text" formControlName="email" placeholder="email" />
            <small *ngIf="!signInForm.controls.email.valid && submitted">Valid email is mandatory</small>
            <input class="form-control" type="password" formControlName="password" placeholder="password" />
            <input type="submit" class="form-control btn btn-default" value="Submit"/>
        </form>
    </div>
        <button (click)="accessPublicDashboard()">Enter as a guest</button>
  </div>
        <div *ngIf="dashboard">
            <div *ngIf="loggedIn">
            <button (click)="logout()" class="logout-button btn btn-default">Log out</button>
            </div>
            
            <div *ngIf="!loggedIn">
            <button (click)="openLogin()" class="logout-button btn btn-default">Return to Log in page</button>
            </div>
            
            <dashboard [token]="token" [private]="loggedIn" ></dashboard>
        </div>
`
})
export class Login {

    constructor(public fb: FormBuilder, private userService: UserService, private surveyService: SurveyService){}
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
            password:['',[Validators.required]],
            password2:['',[Validators.required]]
        });
       // this.users = this.UserService.getData();
    }

    signup=false;
    dashboard=false;
    user={};
    submitted=false;
    loggedIn=false;
    token='';

    onCreateUser(event,user,valid) {
        event.preventDefault();
        this.submitted = true;
        if (valid) {
            if (user.password === user.password2) {
                let newUser = {email:user.email, password:user.password}
                console.log(newUser);
                this.userService.createUser(newUser).subscribe(user => {
                    this.dashboard=true;
                    this.loggedIn=true;
                },error => {
                    console.log('there was an error: ')
                    console.log(error)
                    })
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
    openLogin() {
        this.dashboard=false;
        this.signup=false;
    }

    onLogin(event,value,valid) {
        event.preventDefault();
        this.submitted = true;
        if (valid) {
            let body = {email:value.email, password:value.password}
            this.userService.login(body).subscribe(user =>{
               // this.getSurveys();
                this.loggedIn=true;
                this.dashboard=true;
                this.token=user.tokens[0].token
                console.log(this.token)
            }, error=>{
                console.log(error)
            })
            console.log('check for login')
        }
    }

    accessPublicDashboard(){
        this.dashboard=true;
    }

}