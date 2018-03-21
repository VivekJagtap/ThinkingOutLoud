const express = require('express');
const autherRouter = express.Router();
const promise = require('promise');

var autherRepository = require('../Repository/Auther.repository');

var requestMapping = '/auther';
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

    autherRouter.get(`${requestMapping}`,(req,res)=>{
        res.send('Auther resource is working fine');
    });

    /**
     * get auther by name.
     */
    autherRouter.get(`${requestMapping}/findByAuthername/:name`,(req,res)=>{
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
    autherRouter.get(`${requestMapping}/all`,(req,res)=>{
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
    autherRouter.post(`${requestMapping}/save`,(req,res)=>{
        autherRepository.saveNewAuther(req.body).then(data=>{
            console.log("New auther saved Successfully : "+data);
            res.send(data);
        })
        .catch(err=>{
            console.log("Failure while saving new auther : "+err);
            res.send(err);
        });
    });

module.exports = autherRouter;