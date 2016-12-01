import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Login } from './login.component';
import { Dashboard } from './dashboard.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AddSurveyForm } from './addSurveyForm.component'

@NgModule({
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule  ],
    declarations: [ AppComponent, Login, Dashboard, AddSurveyForm],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }