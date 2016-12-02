import { Component, Input } from '@angular/core';
import { SurveyService } from './services/survey.service';

@Component({
    selector:'survey',
    providers:[SurveyService],
    template:`
        <h3 (click)="toggleSurvey()">{{survey.title}}</h3>
        <button *ngIf='mySurvey' (click)="deleteSurvey()">Delete</button>
        <div *ngIf="open">

            <div *ngFor="let option of survey.options">
                    <input type="checkbox"
               name=option
               (change)="changeOption($event,option)"
                />
                {{option.text}}
            </div>     
         <button (click)="saveOptions()">Save</button>
        </div>
    `
})

export class Survey {
    @Input('survey') survey;
    @Input('user') user;
    @Input('token') token;
    constructor(private surveyService:SurveyService){

    }
    mySurvey=false;
    ngOnInit(){
        if(this.user){
            if(this.user._id.toString()===this.survey._creator.toString()){
                this.mySurvey=true;
            }
        }

    }
    open:boolean = false;
    options=[];
    toggleSurvey(){
        this.open = !this.open;
    }
    changeOption(event,option){
        if(event.target.checked){
            this.options.push(option)
        } else {
            let index = this.options.indexOf(option);
            this.options.splice(index,1);
        }
    }
    saveOptions(){
        for(let i in this.options){
            this.surveyService.saveOption(this.survey._id,this.options[i]._id).subscribe(survey=>{
                console.log('success?')
            }, error =>{
                console.log(error)
            })
        }
    }
    deleteSurvey(){
        this.surveyService.deleteSurvey(this.survey._id,this.token).subscribe(survey=>{
            console.log('deleted')
        }, error=>{
            console.log(error)
        })
    }

}