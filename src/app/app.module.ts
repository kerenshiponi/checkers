import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BoardComponent } from './board/board.component';

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  RouterModule.forRoot([
                    { path: '', component: BoardComponent },
                  ]) ],
  declarations: [ AppComponent, HelloComponent, BoardComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
