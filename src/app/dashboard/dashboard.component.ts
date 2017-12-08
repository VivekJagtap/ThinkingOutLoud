import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
public Users;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('/api/user/all').subscribe(data=>{
      this.Users = data;
    })
  }

}
