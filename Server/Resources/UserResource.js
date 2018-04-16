const express = require('express');
const userRouter = express.Router();
const promise = require('promise');
var User = require('../Models/User');

var requestMapping = '/user'

/**
 * User API starts from here.
 */
var userRepository = require('../Repository/UserRepository');

    userRouter.get(`${requestMapping}/findByUsername/:username`,(req,res)=>{
        userRepository.getUserByUserName(req.params.username).then(data=>{
            console.log("Record found : "+data);
            res.send(data);
        })
        .catch(err=>{
            console.log("Failure while finding record for : username -> "+req.params.username);
            res.send(err);
        });
    });

    /**
     * get user by username.
     */
    userRouter.get(`${requestMapping}/findByUsername/:username`,(req,res)=>{
        userRepository.getUserByUserName(req.params.username).then(data=>{
            console.log("Record found : "+data);
            res.send(data);
        })
        .catch(err=>{
            console.log("Failure while finding record for : username -> "+req.params.username);
            res.send(err);
        });
    });


    /**
     * get all users
     */
    userRouter.get(`${requestMapping}/all`,(req,res)=>{
        userRepository.getAllUser().then(data=>{
            console.log("No. of records received : "+data.length);
            res.send(data);
        })
        .catch(err=>{
            console.log("failure while getting all users : "+err);
            res.send(err);
        });
    });



    /**
     * Create a new user.
     
    userRouter.post(`${requestMapping}/save`,(req,res)=>{
        userRepository.saveNewUser(req.body).then(data=>{
            console.log("New User saved Successfully : "+data);
            res.send(data);
        })
        .catch(err=>{
            console.log("Failure while saving new User : "+err);
            res.send(err);
        });
    });*/


    /**
     * Update user by name :username with username_updated.
     */
    userRouter.get(`${requestMapping}/update/:username`,(req,res)=>{
        userRepository.updateUserByUsername(req.params.username).then(data=>{
            console.log(" User updated Successfully : "+data);
            res.send(data);
        })
        .catch(err=>{
        console.log("Failure while updating new User : "+err);
            res.send(err);
        });
    });


    /**
     * delete user by username :username.
     */
    userRouter.get(`${requestMapping}/delete/:username`,(req,res)=>{
        userRepository.deleteUserByUsername(req.params.username).then(data=>{
            console.log(" User deleted Successfully : "+data);
            res.send(data);
        })
        .catch(err=>{
        console.log("Failure while deleting new User : "+err);
            res.send(err);
        });
    });

    module.exports = userRouter;