import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class RegistrationService {
  private Data = new BehaviorSubject<Object>({});
  currentData = this.Data.asObservable();

  constructor() { }

  getData = function(){
    return this.Data;
  }

  setData = function(data){
    this.Data.next(data);
  }
}
