const express = require('express');
const router = express.Router();
const axios =  require('axios');
const promise = require('promise');
var User = require('../Models/User');
//var Sessions = [];
const authjwt = require('../Service/authetication.service');

/**
 * Middleware for checking the token validity.
 */
router.use((req,res,next)=>{
    console.log('validate');
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        var valid = authjwt.validateToken(token);
        if(valid)
         next();
        else{
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        } 
    }
        
})

router.get('/',(req,res)=>{
    res.send('API of Thinking out loud is working!!');
});


var requestMapping = {
    userResource:'/user',
    autherResource:'/auther',
    articleResource:'/article',
    ideasResource:'/ideas' 
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
    router.get(`${requestMapping}`,(req,res)=>{
        res.send('User resource is working fine'+JSON.stringify(user));
    });

    /**
     * Authenticate user
     */
    router.post(`${requestMapping.userResource}/authenticate`,(req,res)=>{
        console.log(req.body);
        userRepository.authenticateUser(req.body.Username,req.body.Password).then(data=>{
           /* var sess = {
                id:req.sessionID,
                cookie:req.session.cookie,
                email:data.email,
                username:data.username
            }
            Sessions.push(sess);*/
            console.log("1");
            var token = authjwt.createToken(data);
            console.log("Login Success: "+JSON.stringify(token));
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
     * Authenticate user
     */
    router.get(`${requestMapping.userResource}/logout/:username`,(req,res)=>{
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
    router.get(`${requestMapping.userResource}/findByUsername/:username`,(req,res)=>{
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
    router.get(`${requestMapping.userResource}/all`,(req,res)=>{
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
    router.post(`${requestMapping.userResource}/save`,(req,res)=>{
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
    router.get(`${requestMapping.userResource}/update/:username`,(req,res)=>{
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
    router.get(`${requestMapping.userResource}/delete/:username`,(req,res)=>{
        userRepository.deleteUserByUsername(req.params.username).then(data=>{
            console.log(" User deleted Successfully : "+data);
            res.send(data);
        })
        .catch(err=>{
        console.log("Failure while deleting new User : "+err);
            res.send(err);
        });
    });


/**
 * Auther API starts from Here.
 */
    var autherRepository = require('../Repository/Auther.repository');

    var auther = {
        name:'Chetan Bhagat',
        age:29,
        gender:'male',
        profession:'Writer',
        User:{
            "_id" : "5a437003246d8817c45a5ad2",
            "username" : "WhiteWolf",
            "password" : "695e239b2c52341ace31004314a5f6d6",
            "email" : "whitewolf@yopmail.com",
        }
    }

        router.get(`${requestMapping.autherResource}`,(req,res)=>{
            res.send('Auther resource is working fine');
        });

        /**
         * get auther by name.
         */
        router.get(`${requestMapping.autherResource}/findByAuthername/:name`,(req,res)=>{
            autherRepository.getAutherByName(req.params.name).then(data=>{
                console.log("Record found : "+data);
                res.send(data);
            })
            .catch(err=>{
                console.log("Failure while finding record for : username -> "+req.params.username);
                res.send(err);
            });
        });


        /**
         * get all authers
         */
        router.get(`${requestMapping.autherResource}/all`,(req,res)=>{
            autherRepository.getAllAuthers().then(data=>{
                console.log("No. of records received : "+data.length);
                res.send(data);
            })
            .catch(err=>{
                console.log("failure while getting all authers : "+err);
                res.send(err);
            });
        });



        /**
         * Create a new auther.
         */
        router.post(`${requestMapping.autherResource}/save`,(req,res)=>{
            autherRepository.saveNewAuther(req.body).then(data=>{
                console.log("New auther saved Successfully : "+data);
                res.send(data);
            })
            .catch(err=>{
                console.log("Failure while saving new auther : "+err);
                res.send(err);
            });
        });



/**
 * Article API starts from Here.
 */
    var articlesRepository = require('../Repository/Articles.repository');
    
        var article = {
            title:'Half Girlfriend',
            subtitle:'My love story',
            content:'This is Romantic novel story which tell about authers love life.',
            category:'Romance',
            auther:{
                "_id" : "5a4373d48afd770320b951ba",
                "name" : "Chetan Bhagat",
                "age" : 29,
                "gender" : "male",
                "profession" : "Writer",
                "User" : "5a437003246d8817c45a5ad2",
                "__v" : 0
            }
        }
    
            router.get(`${requestMapping.articleResource}`,(req,res)=>{
                res.send('Article resource is working fine');
            });
    
    
    
            /**
             * get all authers
             */
            router.get(`${requestMapping.articleResource}/all`,(req,res)=>{
                articlesRepository.getAllArticles().then(data=>{
                    console.log("No. of articles received : "+data.length);
                    res.send(data);
                })
                .catch(err=>{
                    console.log("failure while getting all articles : "+err);
                    res.send(err);
                });
            });
    
    
    
            /**
             * Create a new article.
             */
            router.post(`${requestMapping.articleResource}/save`,(req,res)=>{
                articlesRepository.saveNewArticle(req.body).then(data=>{
                    console.log("New article added Successfully : "+data);
                    res.send(data);
                })
                .catch(err=>{
                    console.log("Failure while saving new article : "+err);
                    res.send(err);
                });
            });

/**
 * Ideas API starts from Here.
 */
var ideasRepository = require('../Repository/Ideas.repository');

    var idea = {
        thought:'Clear Your Mind.',
        context:'free yourself from this cruel world.',
        category:'philosophy',
        auther:{
            "_id" : "5a4373d48afd770320b951ba",
            "name" : "Chetan Bhagat",
            "age" : 29,
            "gender" : "male",
            "profession" : "Writer",
            "User" : "5a437003246d8817c45a5ad2",
            "__v" : 0
        }
    }

        router.get(`${requestMapping.ideasResource}`,(req,res)=>{
            res.send('idea resource is working fine');
        });



        /**
         * get all ideas
         */
        router.get(`${requestMapping.ideasResource}/all`,(req,res)=>{
            ideasRepository.getAllIdeas().then(data=>{
                console.log("No. of ideas received : "+data.length);
                res.send(data);
            })
            .catch(err=>{
                console.log("failure while getting all ideas : "+err);
                res.send(err);
            });
        });



        /**
         * Create a new idea.
         */
        router.post(`${requestMapping.ideasResource}/save`,(req,res)=>{
            ideasRepository.saveNewIdea(req.body).then(data=>{
                console.log("New idea added Successfully : "+data);
                res.send(data);
            })
            .catch(err=>{
                console.log("Failure while saving new idea : "+err);
                res.send(err);
            });
        });            

module.exports = router;

