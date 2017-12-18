var userRepository = {};
var User = require('../Models/User');
const promise = require('promise');
var properties = require('../server.properties');


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
    
        newUser.save(function(err,result){
             console.log('saving');
                if(err){
                    reject(err);
                };
                resolve(result);
            })  
        });
}


userRepository.getAllUser = ()=>{
    return new Promise(function(resolve,reject){
        User.find({},(err,users)=>{
            if(err) 
                reject(err)

            resolve(users);    
        });
    })
}

userRepository.getUserByUserName = (Name)=>{
    return new Promise(function(resolve,reject){
        User.find({username:Name},(err,user)=>{
            if(err) 
                reject(err);
            
            resolve(user);
        });
    });
}

userRepository.getUserByEmail = (Email)=>{
    User.find({email:Email},(err,users)=>{
        if(err) throw err;
        
        console.log(JSON.stringify(users));
    });
}

userRepository.getUserByUsername = (name)=>{
    return new promise((resolve,reject)=>{
        User.find({}).where('username').equals(name).exec((err,user)=>{
            if(err) 
                reject(err);
            
            resolve(user);
        });
    });
}

userRepository.deleteUserByUsername = (Username)=>{
    return new promise((resolve,reject)=>{
        User.findOneAndRemove({username:Username},function(err,result){
            if(err)
                reject(err);
            
            resolve(result);
        });
   });
}

userRepository.updateUserByUsername = (Username)=>{
    return new promise((resolve,reject)=>{
        User.findOneAndUpdate({username:deleteUserByUsername},{username:Username+'_updated'},function(err,user){
            if(err)
                reject(err);
            
            resolve(user);
        });
    });
}

module.exports = userRepository;
