import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'DASHBOARD!';
  subTitle='These are our users!!';  
  public Users;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    const header = new HttpHeaders({'x-access-token':localStorage.getItem('jwtApplicationToken')});
    this.http.get('/api/user/all',{headers:header}).subscribe(data=>{
      this.Users = data;
      console.log("Received data : "+data);
    })
  }

  updateUser(user){
   this.http.get(`/api/user/update/${user.username}`).subscribe(data=>{
      console.log("updated "+JSON.stringify(data));
    })
  }

  deleteUser(user){
    this.http.get(`/api/user/delete/${user.username}`).subscribe(data=>{
      console.log("user deleted ");
    });
  }
}
