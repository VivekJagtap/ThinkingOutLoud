var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Auther = require('./auther');

/**
 * Trying embedded docs in db.collection
 */
var articlesSchema = new Schema({
    title:{type:String,required:true},
    subtitle:{type:String},
    content:{type:String,required:true},
    category:{type:String,required:true},
    auther:{type:Schema.Types.ObjectId,ref:'auther',required:true}
});

var Articles = mongoose.model('Articles',articlesSchema);

module.exports = Articles;