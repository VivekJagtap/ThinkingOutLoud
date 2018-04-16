const express = require('express');
const router = express.Router();
//var Sessions = [];
const authjwt = require('../Service/authetication.service');

var userRepository = require('../Repository/UserRepository');
    /**
     * Test API.
     */
    router.get('/',(req,res)=>{
        res.send('API of Thinking out loud is working!!');
    });

    /**
     * Create a new user.
     */
    router.post(`/user/save`,(req,res)=>{
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
     * Authenticate user
     */
    router.post(`/user/authenticate`,(req,res)=>{
        console.log(req.body);
        userRepository.authenticateUser(req.body.Username,req.body.Password).then(data=>{
           /* var sess = {
                id:req.sessionID,
                cookie:req.session.cookie,
                email:data.email,
                username:data.username
            }
            Sessions.push(sess);*/
            var token = authjwt.createToken(data);
            
            res.json({
                success:true,
                username:data.username,
                message:'User Authenticated successfully!',
                token:token
            });
        })
        .catch(err=>{
            console.log("Login Failed for : username -> "+err);
            res.json({
                success:false,
                message:'User Authenticated failed!',
                token:null
            });
        });
    });

   


    /**
     * Middleware for checking the token validity.
     */
    router.use((req,res,next)=>{
        console.log('validate');
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(token){
            authjwt.validateToken(token).then(data=>{
                if(data)
                    next();
                else{
                    return res.status(403).send({ 
                        success: false, 
                        message: 'No token provided.' 
                    });
                } 
            }).catch(err=>{
                console.log(err);
            });
            
        }    
    });

    /**
     * All API calls for user Resource.
     */
    const userResource = require('./UserResource');
    router.use(userResource);

    /**
     * All API calls for auther Resource.
     */
    const autherResource = require('./AutherResource');
    router.use(autherResource);

    /**
     * All API calls for articles Resource.
     */
    const articleResource = require('./ArticleResource');
    router.use(articleResource);

    /**
     * All API calls for ideas Resource.
     */
    const ideasResource = require('./IdeaResource');
    router.use(ideasResource);

module.exports = router;

