import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationGuardService } from '../Services/authentication-guard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user;
  public loggedin = false;
  public Username = '';
  
  constructor(private http:HttpClient,private cookieService:CookieService,private authService:AuthenticationGuardService) { 
    this.user={
      username:'',
      password:''
    }
  }

  ngOnInit() {
  }

  setSessionObject(Session){
    this.loggedin = true;
    this.authService.setSessionAndAuth(Session,true);
    this.Username = Session.username;
  }

  authenticate(formData:Object,isValid:boolean){
    this.http.post('/api/user/authenticate',formData,{}).subscribe(data=>{
        var Session = data;
        console.log(JSON.stringify(Session));
        this.setSessionObject(Session);
    });
  }

  logout(){
    this.http.get(`/api/user/logout/${this.Username}`,{}).subscribe(data=>{
      this.authService.setSessionAndAuth({},false);
      this.loggedin = false;
    });
  }
}
