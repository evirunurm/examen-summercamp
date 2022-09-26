import {Component, Input, OnInit} from '@angular/core';
import {Person} from "../../models/person.model";
import {PeopleService} from "../../services/people.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-people-container',
  templateUrl: './people-container.component.html',
  styleUrls: ['./people-container.component.css']
})
export class PeopleContainerComponent implements OnInit {
  // @ts-ignore
  private eventsSubscription: Subscription
  // @ts-ignore
  @Input() updateEvent: Observable<void>;

  people: Person[] = [];
  showPeople: Person[] = [];
  limited: boolean = false;
  editing: boolean = false;
  editingPerson: Person | undefined = undefined;

  constructor(private peopleService: PeopleService,
              ) { }

  ngOnInit(): void {
    this.loadPeople();
    this.eventsSubscription = this.updateEvent.subscribe(() =>
      this.loadPeople());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  loadPeople() {
    console.log("Loading")
    this.peopleService.GetPerson().subscribe(res => {
        this.people = <Person[]> res;
        this.showPeople = [...this.people];

      },
      err => {
        console.log("Error while fetching people", err);
      });
  }

  limit() {
    this.limited = !this.limited;

    if (!this.limited) {
      this.showPeople = [...this.people];
    } else {
      // SORT
      this.showPeople.sort((a, b) => {
        if (a?.name < b?.name) {
          return -1;
        }
        if (a?.name > b?.name) {
          return 1;
        }
        return 0;
      });
      // AGE
      this.showPeople = this.showPeople.filter(p => {
        let month_diff = Date.now() - new Date(p.birthDate).getTime();
        let age_dt = new Date(month_diff);
        let year = age_dt.getUTCFullYear();
        let age = Math.abs(year - 1970);
        console.log(age)
        return age > 21;
      })

      // LIMIT
      this.showPeople = this.showPeople.slice(Math.max(this.showPeople.length -10, 0));
    }
  }

  editPerson(person: Person) {
    this.editing = true;
    this.editingPerson = person;
  }
}
