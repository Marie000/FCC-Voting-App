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
<!--LOGIN / SIGNUP PAGE-->
  <div *ngIf="!dashboard" class="login-page">
  <h1>Welcome my voting app!</h1>
  <h2 *ngIf="signup">Sign up</h2>
  <h2 *ngIf="!signup">Log in</h2>

    <div id="message">{{message}}</div>
    <!--SIGNUP PAGE--->
    <div *ngIf="signup" >
        <form class="form-group" [formGroup]="createUserForm" (ngSubmit)="onCreateUser($event,createUserForm.value,createUserForm.valid)">
            <div class="input-field">
            <label>email</label>
            <input class="form-control" type="text" formControlName="email" name="email"/>
            <small *ngIf="!createUserForm.controls.email.valid && submitted">Valid email is mandatory</small>
            </div>
            <div class="input-field">
            <label>password</label>
            <input class="form-control" type="password" formControlName="password" name="password"/>
            <small *ngIf="!createUserForm.controls.password.valid && submitted">Please enter a password - minimum 5 characters</small>
            </div>
            
            <div class="input-field">
            <label>re-type password</label>
            <input class="form-control" type="password" formControlName="password2" name="password2"/>
            <small *ngIf="!createUserForm.controls.password2.valid && submitted">Please re-enter your password</small>
            </div>
            <input type="submit" class="form-control btn btn-default" value="Submit" />
        </form>
    </div>
        
    <!--LOGIN PAGE-->
    <div *ngIf="!signup">
        <form [formGroup]="signInForm" (ngSubmit)="onLogin($event,signInForm.value,signInForm.valid)" class="form-group">
            <input class="form-control" type="text" formControlName="email" placeholder="email" />
            <small *ngIf="!signInForm.controls.email.valid && submitted">Valid email is mandatory</small>
            <input class="form-control" type="password" formControlName="password" placeholder="password" />
            <input type="submit" class="form-control btn btn-default" value="Submit"/>
        </form>
    </div>
    
    <!--BUTTONS-->
    <div *ngIf="signup">   <button class="btn btn-default" (click)="toggleForms()">LogIn</button> </div>
    <div *ngIf="!signup">   <button class="btn btn-default" (click)="toggleForms()">Create a user</button> </div>  
      <br>
    <div><button (click)="accessPublicDashboard()" class="btn">Enter as a guest</button></div>
    
  </div><!-- END OF LOGIN / SIGNUP PAGE-->
    
  <!--DASHBOARD-->
  <div *ngIf="dashboard">
     <div *ngIf="loggedIn">
       <button (click)="logout()" class="logout-button btn btn-default">Log out</button>
     </div>
            
     <div *ngIf="!loggedIn">
       <button (click)="openLogin()" class="logout-button btn btn-default">Return to Log in page</button>
     </div>
            
     <dashboard [user]='loggedInUser' [token]="token" [private]="loggedIn" ></dashboard>
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
    dashboard=false; // should be false
    user={};
    submitted=false;
    loggedIn=false;
    token='';
    loggedInUser='';
    message='';

    onCreateUser(event,value,valid) {
        event.preventDefault();
        this.submitted = true;
        if (valid) {
            console.log("valid")
            if (value.password === value.password2) {
                let newUser = {email:value.email, password:value.password}
                console.log('newUser: ',newUser)
                this.userService.createUser(newUser).subscribe(user => {
                    this.signup=false;
                    this.submitted=false;
                    this.message='Successfully created an account for '+user.email+'. Please re-enter your email and password to log in.'
                },error => {
                    console.log('there was an error: ')
                    console.log(error)
                    },
                    ()=>{this.createUserForm.reset();}
                )
                } else {
                   this.message='passwords must match';
                }
        }
    }
    toggleForms(){
        this.signup=!this.signup;
    }
    logout() {
        this.dashboard=false;
        this.signup=false;
        this.submitted=false;
        this.token='';
        this.loggedInUser='';
        this.loggedIn=false;
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
                this.loggedIn=true;
                this.dashboard=true;
                this.token=user.tokens[0].token;
                this.loggedInUser=user;
                this.message=''
            }, error=>{
                this.message='invalid email or password'
            },()=>{this.signInForm.reset()})
        }
    }

    accessPublicDashboard(){
        this.dashboard=true;
    }

}