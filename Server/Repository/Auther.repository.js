var AutherRepository = {};
var Auther = require('../Models/auther');
const promise = require('promise');

AutherRepository.saveNewAuther = (auther)=>{
    return new promise(function(resolve,reject){
        var newAuther = new Auther({
            name:auther.name,
            age:auther.age,
            gender:auther.gender,
            profession:auther.profession,
            User:auther.User
        });

        newAuther.save((err,result)=>{
            if(err)
                reject(err);
            resolve(result);                
        })
    });
}

AutherRepository.getAllAuthers = ()=>{
    return new promise(function(resolve,reject){
        Auther.find({},(err,authers)=>{
            if(err)
                reject(err);
            resolve(authers);    
        })
    });
}

AutherRepository.getAutherByName = (Name)=>{
    return new promise(function(resolve,reject){
        Auther.find({name:Name},(err,authers)=>{
            if(err)
                reject(err);
            resolve(authers);    
        });
    });
}

module.exports = AutherRepository;