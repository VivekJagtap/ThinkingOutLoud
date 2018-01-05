const session = require('express-session');

var sessionManager = {Sessions:[]};

sessionManager.createNewSession = (sessionObj) =>{
    this.Sessions.push(sessionObj);
}