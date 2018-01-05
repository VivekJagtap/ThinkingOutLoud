import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user;
  constructor(private http:HttpClient,private cookieService:CookieService) { 
    this.user={
      username:'',
      password:''
    }
  }

  ngOnInit() {
  }


  authenticate(formData:Object,isValid:boolean){
    this.http.post('/api/user/authenticate',formData,{}).subscribe(data=>{
        console.log(data);
        var session=JSON.stringify(data);
        this.cookieService.set('session',session);
    });
  }
}
