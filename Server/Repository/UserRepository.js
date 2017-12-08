var userRepository = {};
var User = require('../Models/User');
const promise = require('promise');

var properties = require('../server.properties');
var response = properties.response;

userRepository.saveNewUser = (user)=>{
    return new Promise(function(resolve,reject){
        var newUser = new User({
            username:user.username,
            password:user.password,
            email:user.email,
        });
    
        newUser.encryptPassword((err,password)=>{
            if(err) 
                return reject(err);
            console.log('Encrypted password is -> '+password);
        });
    
        newUser.save(function(err){
            if(err){
                return reject(err);
            };
            console.log('user saved successfully');
            response.status = 200;
            response.data = user;
            console.log('REPOO--'+JSON.stringify(response));
            return response;
        });
    });
    
   
}


userRepository.getAllUser = ()=>{
    User.find({},(err,users)=>{
        if(err) throw err;

        console.log(JSON.stringify(users));
        
    });
}

userRepository.getUserByUserName = (Name)=>{
    User.find({username:Name},(err,users)=>{
        if(err) throw err;
        
        console.log(JSON.stringify(users));
    });
}

userRepository.getUserByEmail = (Email)=>{
    User.find({email:Email},(err,users)=>{
        if(err) throw err;
        
        console.log(JSON.stringify(users));
    });
}

userRepository.getUserByQuery = (name)=>{
    User.find({}).where('username').equals(name).exec((err,users)=>{
        if(err) throw err;
        
        console.log(JSON.stringify(users));
    });
}

module.exports = userRepository;
