const express = require('express');
const router = express.Router();
const axios =  require('axios');
const promise = require('promise');

var User = require('../Models/User');

router.get('/',(req,res)=>{
    res.send('API of Thinking out loud is working!!');
});


var requestMapping = '/user'; 
var userRepository = require('../Repository/UserRepository');

var user = {
    username:'drakeblade',
    password:'11111111',
    email:'drakeblade@yopamil.com'
}

router.get(`${requestMapping}`,(req,res)=>{
    res.send('User resource is working fine'+JSON.stringify(user));
});


/**
 * get user by username.
 */
router.get(`${requestMapping}/:username`,(req,res)=>{
        User.find({}).where('username').equals(req.params.username).exec((err,users)=>{
            if(err) reject(err);
            
            res.send(JSON.stringify(users));
            console.log(JSON.stringify(users));
            
        });
});

/**
 * get all users
 */
router.get(`${requestMapping}/all`,(req,res)=>{
            User.find({},(err,users)=>{
                if(err) res.send(JSON.stringify(err));

                console.log(JSON.stringify(users));
                res.send(JSON.stringify(users));
            });
});

/**
 * Create a new user.
 */
router.post(`${requestMapping}/save`,(req,res)=>{
   userRepository.saveNewUser(req.body);
   console.log('user created successfully 22');
});

/**
 * Update user by name :username with deathdavis.
 */
router.get(`${requestMapping}/update/:username`,(req,res)=>{
    console.log(req.params.username);
    return new promise((resolve,reject)=>{
        User.findOneAndUpdate({username:req.params.username},{username:req.params.username+'_updated'},function(err,user){
            if(err)
                reject(err);
            
            resolve(user);
        });
    });
});

/**
 * delete user by username :username.
 */
router.get(`${requestMapping}/delete/:username`,(req,res)=>{
    return new promise((resolve,reject)=>{
        User.findOneAndRemove({username:req.params.username},function(err){
            if(err)
                reject(err);
            
            resolve(`user ${req.params.username} deleted successfully`);
        });
    });
});

module.exports = router;

