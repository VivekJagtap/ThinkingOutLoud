var IdeasRepository = {};
var Ideas = require('../Models/ideas');
const promise = require('promise');

IdeasRepository.saveNewIdea = (idea)=>{
    return new promise(function(resolve,reject){
        var newIdea = new Ideas({
            thought:idea.thought,
            context:idea.context,
            category:idea.category,
            auther:idea.auther
        });

        newIdea.save((err,result)=>{
            if(err)
                reject(err);
            resolve(result);    
        })
    });
}

IdeasRepository.getAllIdeas = ()=>{
    return new promise(function(resolve,reject){
        Ideas.find({},(err,ideas)=>{
            if(err)
                reject(err);
            resolve(ideas);    
        })
    })
}

module.exports = IdeasRepository;