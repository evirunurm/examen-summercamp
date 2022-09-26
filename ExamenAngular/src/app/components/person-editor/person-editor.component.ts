import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PeopleService} from "../../services/people.service";
import {Person} from "../../models/person.model";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent implements OnInit {
  @Input() person: Person | undefined = undefined;
  // @ts-ignore
  @ViewChild("form") form: ElementRef;
  @Output() changed = new EventEmitter();

  message: string = ""
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
  }

  submit() {
    let newPerson: Person = new Person();
    console.log(this.form.nativeElement.birthdate)
    // @ts-ignore
    newPerson.id = this.person.id;
    newPerson.name = this.form.nativeElement.Name.value;
    newPerson.birthDate = this.form.nativeElement.birthdate.value;
    newPerson.phoneNumber = this.form.nativeElement.phonenumber.value;

    console.log(newPerson)
    // @ts-ignore
    if (this.person.id != null) {
      // @ts-ignore
      this.peopleService.PutPerson(this.person.id, newPerson).subscribe(res => {
        this.message = "Saved!";
        this.changed.emit();
      },
        err => {
          this.message =err.error.title;
        console.log(err)
        })
    }

    // TODO: Event that updates parent component and closes window
  }

  delete() {
    // @ts-ignore
    if (this.person.id != null) {
      // @ts-ignore
      this.peopleService.DeletePerson(this.person.id).subscribe(res => {
          this.message = "Deleted!";
          this.changed.emit();
        },
        err => {
          this.message =err.error.title;
          console.log(err)
        })
    }
    this.changed.emit();
    // TODO: Event that updates parent component and closes window
  }
}
