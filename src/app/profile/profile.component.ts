import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RegistrationService } from '../Services/registration.service'; 
import { auther } from '../Models/auther.interface';
import { RestResourceServiceService } from '../Services/rest-resource-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private Auther:auther;

  constructor(private router:Router, private Reg:RegistrationService,private restService:RestResourceServiceService) { 
    this.Auther = {
      name:'',profession:'',age:0,gender:'',User:{}
    }
  }

  ngOnInit() {
    this.Reg.currentData.subscribe(Data => this.Auther.User = Data);
    console.log(JSON.stringify(this.Auther));
  }

  save(model:auther,isValid:boolean){
    if(isValid){
      this.restService.postResource('/api/auther/save',model).then(data=>{
        console.info('User and Auther Saved Successfully :'+JSON.stringify(data));
      }).catch(error=>{
        console.log(JSON.stringify(error));
      })
    }
  };

  back(){
    this.router.navigate['/registration'];
  }
}
