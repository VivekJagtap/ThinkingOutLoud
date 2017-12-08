import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user:User;

  constructor() { }

  ngOnInit() {
    this.user = {
      username:'',
      password:'',
      email:''
    }
  }

  save(model:User,isValid:boolean){
    console.log(model,isValid);
  }
}
