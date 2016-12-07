import {Component, Input} from '@angular/core';
import {SurveyService} from './services/survey.service';
import {Observable} from 'rxjs/Rx';
import {AddSurveyForm} from './addSurveyForm.component'

@Component({
    selector:'dashboard',
    viewBindings:[SurveyService],
    directives:[AddSurveyForm],
    template:`
        <h1>
        <span *ngIf="!private">Public</span>
         <span *ngIf="private">Private</span>
         dashboard</h1>
         
         <!--View List of surveys-->
         
         <ul materialize="collapsible" class="collapsible" data-collapsible="accordion" *ngFor="let survey of surveys">
           <li>
           <div class="collapsible-header"><h2>{{survey.title}}</h2></div>
           <div class="collapsible-body">
           <survey [survey]="survey" [user]="user" [token]="token" (onDelete)="refreshList()"></survey>
</div>
           </li>
           
         </ul>
         
         <!--Create a survey-->
         <div *ngIf="private" class="add-survey-form">
         <h2>Create a survey</h2>
         <add-survey-form [token]="token" (onNewSurvey)="refreshList()"></add-survey-form>
        </div>

    `
})

export class Dashboard {
    @Input('private') private;
    @Input('token') token;
    @Input('user') user;

    constructor(private surveyService:SurveyService){
        this.surveyService.getSurveys().subscribe(surveys => this.surveys=surveys);
    }

    surveys=[{'title':'not loaded yet'}];

    refreshList(){
        this.surveyService.getSurveys().subscribe(surveys => this.surveys=surveys);
    }
}