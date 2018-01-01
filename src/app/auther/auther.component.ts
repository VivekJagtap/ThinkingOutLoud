import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../UiComponents/modal/modal.component';

@Component({
  selector: 'app-auther',
  templateUrl: './auther.component.html',
  styleUrls: ['./auther.component.css']
})
export class AutherComponent implements OnInit {
public Authers;
@ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private http:HttpClient) { 

  }
  
  openModal(data){
    console.log(data);
    this.modal.open(data);
  }

  ngOnInit() {
    this.http.get('/api/auther/all').subscribe(data=>{
      this.Authers = data;
    });
  }

}
