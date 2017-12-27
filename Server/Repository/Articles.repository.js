var ArticlesRepository = {};
var Articles = require('../Models/articles');
const promise = require('promise');


ArticlesRepository.saveNewArticle = (article)=>{
    return new promise(function(resolve,reject){
        var newArticle = new Articles({
            title:article.title,
            subtitle:article.subtitle,
            content:article.content,
            category:article.category,
            auther:article.auther
        });

        newArticle.save((err,result)=>{
            if(err)
                reject(err);
            resolve(result);    
        });
    });
}
//
ArticlesRepository.getAllArticles = ()=>{
    return new promise(function(resolve,reject){
        Articles.find({}).populate('auther').exec((err,articles)=>{
            if(err)
              reject(err);
            resolve(articles);  
        });
    });
}


ArticlesRepository.getArticlesByAuther = (autherName)=>{
    return new promise(function(resolve,reject){
        Articles.find({auther:{name:autherName}},(err,articles)=>{
            if(err)
                reject(err);
            resolve(articles);
        })
    })
}

module.exports = ArticlesRepository;