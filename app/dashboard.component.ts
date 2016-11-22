import {Component, Input} from '@angular/core';

@Component({
    selector:'dashboard',
    template:`
        <h1>This is the 
        <span *ngIf="!private">Public</span>
         <span *ngIf="private">Private</span>
         dashboard</h1>
    `
})

export class Dashboard {
    @Input('private') private;
}