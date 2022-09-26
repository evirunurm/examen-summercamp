import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PeopleContainerComponent } from './components/people-container/people-container.component';
import {HttpClientModule} from "@angular/common/http";
import { PersonEditorComponent } from './components/person-editor/person-editor.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PeopleContainerComponent,
    PersonEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
