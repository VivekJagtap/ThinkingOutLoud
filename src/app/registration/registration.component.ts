import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public user:User;

  constructor(private http:HttpClient,private router:Router,private Reg:RegistrationService) { 

  }

  ngOnInit() {
    this.user = {
      username:'',
      password:'',
      email:''
    }
  }

  save(model:User,isValid:boolean){
    console.log(model,isValid);
    this.http.post('/api/user/save',model,{}).subscribe(data=>{
      console.log('Data saved -> '+JSON.stringify(data));
      this.Reg.setData(data);
      this.router.navigate(['/profile']);
    });
  }
}
