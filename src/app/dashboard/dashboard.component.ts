import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RestResourceServiceService } from '../Services/rest-resource-service.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'DASHBOARD!';
  subTitle='These are our users!!';  
  public Users;
  constructor(private restApiService:RestResourceServiceService) { }

  /**
   * On page initialization/load
   */
  ngOnInit() {
    this.restApiService.getResource('/api/user/all').then(data=>{
      this.Users = data;
      console.log("Received data : "+data);
    }).catch(err=>{
      console.log(err);
    });
  }

  /**
   * Update selected user
   * @param user
   */
  updateUser(user,index){
    /*this.restApiService.putResource(`/api/user/update/${user.username}`,user).then(data=>{
      console.log("updated "+JSON.stringify(data));
    }).catch(err=>{
      console.log("err while updating : "+user.username+" ,err :"+err);
    })*/
    this.restApiService.getResource(`/api/user/update/${user.username}`).then(data=>{
      this.Users[index] = data;
      console.log("Received data : "+data);
    }).catch(err=>{
      console.log(err);
    });
  }

  /**
   * Delete selected User.
   * @param user 
   * @param index 
   */
  deleteUser(user,index){
    this.restApiService.deleteResource(`/api/user/delete/${user.username}`).then(data=>{
      console.log("user deleted : "+user.username);
      this.Users[index].delete;
    }).catch(err=>{
      console.log("err while deleting : "+user.username+" ,err :"+err);
    });
  }
}
