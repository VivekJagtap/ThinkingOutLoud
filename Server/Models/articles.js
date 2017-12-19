var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articlesSchema = new Schema({
    title:{type:String,required:true},
    subtitle:{type:String},
    content:{type:String,required:true},
    category:{type:String,required:true},
    auther:{type:Schema.Types.ObjectId,ref:'Auther',required:true}
});

var Articles = mongoose.model('Articles',articlesSchema);

module.exports = Articles;