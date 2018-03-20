import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuardService implements CanActivate{
private authenticated = false;
private session =  {
  id:'',
  cookie:{},
  email:'',
  username:''
}

private token = '';

  setSessionAndAuth(Session,Authed){
    this.token = Session;
    this.authenticated = Authed;
  }

  setTokenAndAuth(Token,Authed){
    this.token = Token;
    this.authenticated = Authed;
    localStorage.setItem('jwtApplicationToken', this.token);
  }

  deleteToken(){
    localStorage.removeItem('jwtApplicationToken');
    this.token = null;
    this.authenticated = false;
  }

  canActivate() {
    //console.log("AuthenticationGuard!!");
    if(this.authenticated && this.token)
      return true;
    else
      return false;
  }

  constructor() { }

}
