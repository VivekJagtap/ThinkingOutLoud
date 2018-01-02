import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../UiComponents/modal/modal.component';


import { GlobalDataService } from '../global-data.service';
import { auther } from '../Models/auther.interface';
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

  constructor(private http:HttpClient,private globalDataService:GlobalDataService) {
    this.Auther={
      name:'',
      age:'',
      gender:'',
      profession:'',
      User:{}
    }
  }
  

  ngOnInit() {
    this.http.get('/api/auther/all').subscribe(data=>{
      this.Authers = data;
    });

    this.http.get('/api/user/all').subscribe(data=>{
      this.Users = data;
    });
  }

  showUser(user){
    console.log(JSON.stringify(user));
  }

  openAccordion(selectedAuther){
    this.Auther = selectedAuther;
  }
  
  save(model:auther,isValid:boolean){
    console.log(this.Auther);
    this.http.post('/api/auther/save',model,{}).subscribe(data=>{
      console.log('Data saved -> '+JSON.stringify(data));
    });
  }
}
