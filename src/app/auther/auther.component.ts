import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../UiComponents/modal/modal.component';


import { GlobalDataService } from '../global-data.service';
import { auther } from '../Models/auther.interface';
import { RestResourceServiceService } from '../Services/rest-resource-service.service';

@Component({
  selector: 'app-auther',
  templateUrl: './auther.component.html',
  styleUrls: ['./auther.component.css'],
  providers:[GlobalDataService]
})
export class AutherComponent implements OnInit {
  title = 'Our Authers!';
  subTitle='These are our honorable Authers, Without their hardwork we are nothing!!';
  public Authers;
  public Users;
  public Auther;
  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private globalDataService:GlobalDataService,private restApi:RestResourceServiceService) {
    this.Auther={
      name:'',
      age:'',
      gender:'',
      profession:'',
      User:{}
    }
  }
  

  ngOnInit() {
    this.restApi.getResource('/api/auther/all').then(data=>{
      this.Authers = data;
    }).catch(err=>{
      console.log(err);
    });

    this.restApi.getResource('/api/user/all').then(data=>{
      this.Users = data;
    }).catch(err=>{
      console.log(err);
    });
  }

  showUser(user){
    console.log(JSON.stringify(user));
  }

  openAccordion(selectedAuther){
    this.Auther = selectedAuther;
  }
  
  save(model:auther,isValid:boolean){
    this.restApi.postResource('/api/auther/save',model).then(data=>{
      console.log('Data saved -> '+JSON.stringify(data));
      this.Authers.push(data);
    }).catch(err=>{
      console.log(err);
    });
  }
}
