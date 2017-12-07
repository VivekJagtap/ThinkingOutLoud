const express = require('express');
const router = express.Router();
var userRepository = require('../Repository/UserRepository');

const userResource = {
    requestMapping : '/user',
    user : {
        username:'darkbull',
        password:'11111111',
        email:'darkbull@yopamil.com'
    },
    Router:router
};


router.get(`${userResource.requestMapping}/save`,(req,res)=>{
        userRepository.saveNewUser(user);
    });

router.get(`${userResource.requestMapping}`,(req,res)=>{
        res.send('User resource is working fine'+JSON.stringify(user));
    });


module.export = userResource;