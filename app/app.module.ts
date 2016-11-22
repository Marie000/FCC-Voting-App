import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { Login } from './login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
    imports:      [ BrowserModule, FormsModule, ReactiveFormsModule  ],
    declarations: [ AppComponent, Login],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }