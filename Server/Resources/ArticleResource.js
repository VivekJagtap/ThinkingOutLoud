const express = require('express');
const articleRouter = express.Router();
const promise = require('promise');

var articlesRepository = require('../Repository/Articles.repository');
var requestMapping = '/article';

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
    
            articleRouter.get(`${requestMapping}`,(req,res)=>{
                res.send('Article resource is working fine');
            });
    
    
    
            /**
             * get all articles
             */
            articleRouter.get(`${requestMapping}/all`,(req,res)=>{
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
            articleRouter.post(`${requestMapping}/save`,(req,res)=>{
                articlesRepository.saveNewArticle(req.body).then(data=>{
                    console.log("New article added Successfully : "+data);
                    res.send(data);
                })
                .catch(err=>{
                    console.log("Failure while saving new article : "+err);
                    res.send(err);
                });
            });

module.exports = articleRouter;