const jwt = require('jsonwebtoken');
const properties = require('../server.properties');
const AuthenticationService = {};
const promise = require('promise');

AuthenticationService.createToken = (user)=>{
    const payload = {
        email:user.email,
        username:user.username
    }
    var token = jwt.sign(payload,`${properties.jwt.secret}`,{expiresIn:60});
    
    return token;
};

AuthenticationService.validateToken = (token)=>{
    return new promise(function(resolve,reject){
        if(token){
            jwt.verify(token,`${properties.jwt.secret}`,(err,decoded)=>{
                if(err)
                    reject(err);
                else
                    resolve(decoded);
            });
        }
        else
           reject(null)
    });
}

module.exports = AuthenticationService;