import {Component, ElementRef, ViewChild} from '@angular/core';
import {PeopleService} from "./services/people.service";
import {Person} from "./models/person.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Examen Angular';
  // @ts-ignore
  @ViewChild("newName") newName: ElementRef;
  // @ts-ignore
  @ViewChild("newBirthday") newBirthday: ElementRef;
  // @ts-ignore
  @ViewChild("newPhone") newPhone: ElementRef;
  // @ts-ignore
  @ViewChild("addNew") addNewForm: ElementRef;
  message: string = "";
  updateEvent: Subject<void> = new Subject<void>();

  constructor(private peopleService: PeopleService) {}

  emitUpdate() {
    this.updateEvent.next();
  }

  create() {
    this.message = "";
    let newperson: Person = new Person();

    newperson.name = this.newName.nativeElement.value;
    newperson.phoneNumber = this.newPhone.nativeElement.value;
    newperson.birthDate = this.newBirthday.nativeElement.value;

    console.log(newperson)
    this.peopleService.PostPerson(newperson).subscribe(res => {
      this.message = "Created!"
      this.emitUpdate();
    },
    err => {
      this.message = err.error.title;
      console.log(err)
    })
  }
}
