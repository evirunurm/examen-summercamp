import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Person} from "../models/person.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  API_URL = environment.API_URL + 'People';
  constructor(private httpClient: HttpClient) { }

  public GetPerson() {
    return this.httpClient.get(this.API_URL);
  }

  public FindOne(id: string) {
    return this.httpClient.get(this.API_URL + "/" + id);
  }

  public PutPerson(id: string, person: Person){
    return this.httpClient.put(this.API_URL + "/" + id, person);
  }

  public PostPerson(person: Person){
    return this.httpClient.post(this.API_URL, person);
  }

  public DeletePerson(id: string){
    return this.httpClient.delete(this.API_URL + "/" + id);
  }

}
