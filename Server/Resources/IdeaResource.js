const express = require('express');
const ideaRouter = express.Router();
const promise = require('promise');

var requestMapping = '/ideas';

var ideasRepository = require('../Repository/Ideas.repository');
    
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
    
            ideaRouter.get(`${requestMapping}`,(req,res)=>{
                res.send('Article resource is working fine');
            });
    
    
    
            /**
             * get all articles
             */
            ideaRouter.get(`${requestMapping}/all`,(req,res)=>{
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
             * Create a new article.
             */
            ideaRouter.post(`${requestMapping}/save`,(req,res)=>{
                ideasRepository.saveNewIdea(req.body).then(data=>{
                    console.log("New idea added Successfully : "+data);
                    res.send(data);
                })
                .catch(err=>{
                    console.log("Failure while saving new idea : "+err);
                    res.send(err);
                });
            });

module.exports = ideaRouter;