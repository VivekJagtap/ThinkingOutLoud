const express = require('express');
const userRouter = express.Router();
const promise = require('promise');
var User = require('../Models/User');
var Sessions = [];
var requestMapping = {
    userResource:'/user'
};

/**
 * User API starts from here.
 */
var userRepository = require('../Repository/UserRepository');

var user = {
    username:'drakeblade',
    password:'11111111',
    email:'drakeblade@yopamil.com'
}
    userRouter.get(`${requestMapping}`,(req,res)=>{
        res.send('User resource is working fine'+JSON.stringify(user));
    });

    /**
     * Authenticate user
     */
    userRouter.post(`${requestMapping.userResource}/authenticate`,(req,res)=>{
        console.log(req.body);
        userRepository.authenticateUser(req.body.Username,req.body.Password).then(data=>{
            var sess = {
                id:req.sessionID,
                cookie:req.session.cookie,
                email:data.email,
                username:data.username
            }
            Sessions.push(sess);
            console.log("Login Success: "+JSON.stringify(Sessions));
            res.send(sess);
        })
        .catch(err=>{
            console.log("Login Failed for : username -> "+req.body.Username);
            res.send("Login Failed for : username -> "+req.body.Username);
        });
    });

    /**
     * Authenticate user
     */
    userRouter.get(`${requestMapping.userResource}/logout/:username`,(req,res)=>{
        var ss = Sessions;
        Sessions = [];
        for(var i=0;i<ss.length;i++){
            if(req.params.username == ss[i].username){ 
                delete ss[i];
            }
        }
        ss.forEach(session => {
            if(Session)
                Sessions.push(session);
        });
        res.send({});
    });

    /**
     * get user by username.
     */
    userRouter.get(`${requestMapping.userResource}/findByUsername/:username`,(req,res)=>{
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
    userRouter.get(`${requestMapping.userResource}/all`,(req,res)=>{
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
     */
    userRouter.post(`${requestMapping.userResource}/save`,(req,res)=>{
    userRepository.saveNewUser(req.body).then(data=>{
        console.log("New User saved Successfully : "+data);
        res.send(data);
    })
    .catch(err=>{
        console.log("Failure while saving new User : "+err);
        res.send(err);
    });
    });


    /**
     * Update user by name :username with username_updated.
     */
    userRouter.get(`${requestMapping.userResource}/update/:username`,(req,res)=>{
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
    userRouter.get(`${requestMapping.userResource}/delete/:username`,(req,res)=>{
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