import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Login } from './login.component';
import { Dashboard } from './dashboard.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddSurveyForm } from './addSurveyForm.component'
import { Survey } from './survey.component';
import { MaterializeDirective } from "angular2-materialize";



@NgModule({
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule  ],
    declarations: [ AppComponent, Login, Dashboard, AddSurveyForm, Survey, MaterializeDirective],
    bootstrap:    [ AppComponent ],
    directives: [ AddSurveyForm ]
})
export class AppModule { }