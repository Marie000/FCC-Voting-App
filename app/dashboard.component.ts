import {Component, Input} from '@angular/core';
import {SurveyService} from './services/survey.service';

@Component({
    selector:'dashboard',
    providers:[SurveyService],
    template:`
        <h1>This is the 
        <span *ngIf="!private">Public</span>
         <span *ngIf="private">Private</span>
         dashboard</h1>
         
         <!--View List of surveys-->
         <h2>List of surveys</h2>
         
         <div *ngFor="let survey of surveys">
           <survey [survey]="survey" [user]="user" [token]="token"></survey>
         </div>
         
         <!--Create a survey-->
         <div *ngIf="private">
         <h2>Create a survey</h2>
         <add-survey-form [token]="token"></add-survey-form>
        </div>

    `
})

export class Dashboard {
    @Input('private') private;
    @Input('token') token;
    @Input('user') user;
    constructor(private surveyService:SurveyService){
        this.surveys=[];
    }
    surveys=[{'title':'not loaded yet'}];
    ngOnInit(){
        this.getSurveys();
    }

    getSurveys(){
        this.surveyService.getSurveys().subscribe(surveys => {
            this.surveys = surveys;
            console.log(surveys)
        })
    }
}