import { Component, Input } from '@angular/core';
import { SurveyService } from './services/survey.service';

@Component({
    selector:'survey',
    providers:[SurveyService],
    template:`
        <li>
        <div class="collapsible-header">
        <h3>{{survey.title}}</h3>
        </div>
        <div class="collapsible-body">

        <button (click)="showResults()" class="btn">
        <span *ngIf="results">Hide Results</span><span *ngIf="!results">Show Results</span>
        </button>
        <button *ngIf='mySurvey' class="btn" (click)="deleteSurvey()">Delete</button>
        <div >

            <div *ngFor="let option of survey.options">
                    <input type="checkbox"
               name=option
               (change)="changeOption($event,option)"
               id={{option._id}}
                />
                <label for={{option._id}}>{{option.text}}</label>
            </div>   
            <div class="input-field">
            <input type="text" [(ngModel)]="newOption" placeholder="enter another option here" />
            </div>
         <button (click)="saveOptions()" class="btn">Save</button>
        </div>
        <div *ngIf="results">
            <div *ngFor="let option of survey.options">
            {{option.text}}: {{option.count}}
            </div>
        </div>
        </div>
        </li>

    `
})

export class Survey {
    @Input('survey') survey;
    @Input('user') user;
    @Input('token') token;
    newOption='';
    constructor(private surveyService:SurveyService){}
    mySurvey=false;
    ngOnInit(){
        if(this.user){
            if(this.user._id.toString()===this.survey._creator.toString()){
                this.mySurvey=true;
            }
        }
    }
    open:boolean = false;
    results:boolean = false;
    options=[];
    toggleSurvey(){
        this.open = !this.open;
        this.results = false;
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
        console.log(this.newOption)
        if(this.newOption){
            this.surveyService.addNewOption(this.survey._id,{'text':this.newOption, 'count':1}).subscribe(survey=>{
                console.log('new option added')
            })
        }
        for(let i in this.options){
            this.surveyService.saveOption(this.survey._id,this.options[i]._id).subscribe(survey=>{
                console.log('success?')
            }, error =>{
                console.log(error)
            })
        }

        this.open = false;
        this.results = true;
    }
    deleteSurvey(){
        this.surveyService.deleteSurvey(this.survey._id,this.token).subscribe(survey=>{
            console.log('deleted')
        }, error=>{
            console.log(error)
        })
    }
    showResults(){
        this.results=!this.results
        this.open=false;
    }

}