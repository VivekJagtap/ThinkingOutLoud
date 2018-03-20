import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationGuardService } from '../Services/authentication-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user;
  public loggedin = false;
  public Username = '';
  
  constructor(private http:HttpClient,private cookieService:CookieService,private authService:AuthenticationGuardService,private router:Router) { 
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

  setToken(data){
    if(data.token){
      this.loggedin = true;
      this.Username = data.username;
      this.authService.setTokenAndAuth(data.token,true);
    }
    else
      console.log('authentication failed!');
  }

  authenticate(formData:Object,isValid:boolean){
    this.http.post('/api/user/authenticate',formData,{}).subscribe(data=>{
       /* var Session = data;
        this.setSessionObject(Session);*/
        //console.log(JSON.stringify(data));
        this.setToken(data);
    });
  }

  logout(){
    this.loggedin = false;
    this.authService.deleteToken();
    this.router.navigate(['/']);
    /*this.http.get(`/api/user/logout/${this.Username}`,{}).subscribe(data=>{
      //this.authService.setSessionAndAuth({},false);
      this.setToken({token:null});
      this.loggedin = false;
    });*/
  }
}
