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

  setSessionAndAuth(Session,Authed){
    this.session = Session;
    this.authenticated = Authed;
  }

  canActivate() {
    console.log("AuthenticationGuard!!");
    if(this.authenticated)
      return true;
    else
      return false;
  }

  constructor() { }

}
