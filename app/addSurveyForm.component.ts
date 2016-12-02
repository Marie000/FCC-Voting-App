import { Component, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SurveyService } from './services/survey.service';


@Component({
    selector:'add-survey-form',
    providers:[SurveyService],
    template:`
    <p>This is the add survey form</p>
    <form class="form-control" 
          [formGroup]="createSurveyForm"
          (ngSubmit)="onCreateSurvey($event,createSurveyForm.value, createSurveyForm.valid)" >
    
          <input class="form-control"
                 type="text"
                 formControlName="title"
                 placeholder="survey title / question"
                 name="title" />
           <ul>      
          <li *ngFor="let option of options">
                {{option.text}}
          </li>
          </ul>
          
          <form class="form-control"
                [formGroup]="addOptionForm"
                (ngSubmit)="onAddOption($event, addOptionForm.value, addOptionForm.valid)">
                
             <input class="form-control"
                    type="text"
                    formControlName="newOption"
                    placeholder="option"
                    name="newOption" />
                    
             <input type="submit" value="submit option" />
          </form>
          
           
          <input type="submit"/>
    </form>
    
    `
})

export class AddSurveyForm {
    @Input('token') token;
    constructor(public fb: FormBuilder, private surveyService: SurveyService){}
    createSurveyForm: FormGroup;
    addOptionForm: FormGroup;
    ngOnInit(){
        this.createSurveyForm = this.fb.group({
            title:['',[Validators.required]],
        })
        this.addOptionForm = this.fb.group({
            newOption:['',[Validators.required]]
        })
    }
    submitted = false;
    options = [];

    onCreateSurvey(event,value,valid){
        event.preventDefault();
        if(event.defaultPrevented){
            this.submitted = true;
            if (valid) {
                let newSurvey = {
                    title:value.title,
                    options:this.options
                };
                this.surveyService.saveSurvey(newSurvey, this.token).subscribe(survey=>{
                    console.log('survey: '+survey)
                }, error =>{
                    console.log(error)
                })
                this.submitted=false;
                this.createSurveyForm.reset();
                this.options=[];
            }
        }
    }

    onAddOption(event,value,valid){
        event.preventDefault();
        if(valid){
            this.options.push({text:value.newOption, count:0})
            this.addOptionForm.reset();
        }
    }
}