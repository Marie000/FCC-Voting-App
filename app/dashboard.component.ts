import {Component, Input} from '@angular/core';

@Component({
    selector:'dashboard',
    template:`
        <h1>This is the 
        <span *ngIf="!private">Public</span>
         <span *ngIf="private">Private</span>
         dashboard</h1>
         
         <!--View List of surveys-->
         <h2>List of surveys</h2>
         <ul>
         <li *ngFor="let survey of surveys">{{survey.title}}</li>
         </ul>
         <!--Create a survey-->
         <div *ngIf="private">
         <h2>Create a survey</h2>
        </div>

    `
})

export class Dashboard {
    @Input('private') private;
    @Input('surveys') surveys;
}