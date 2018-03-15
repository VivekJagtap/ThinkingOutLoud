const jwt = require('jsonwebtoken');
const properties = require('../server.properties');
const AuthenticationService = {};

AuthenticationService.createToken = (user)=>{
    const payload = {
        email:user.email,
        username:user.username
    }
    var token = jwt.sign(payload,`${properties.jwt.secret}`,{expiresIn:60});
    
    return token;
};

AuthenticationService.validateToken = (token)=>{
    if(token){
        jwt.verify(token,`${properties.jwt.secret}`,(err,decoded)=>{
            if(err)
             return false;
            else
             return decoded;   
        })
    }
    else
        return null;
}

module.exports = AuthenticationService;