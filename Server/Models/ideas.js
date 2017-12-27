var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Auther = require('./auther');

var ideasSchema = new Schema({
    thought:{type:String,required:true},
    context:{type:String,required:true},
    category:{type:String,required:true},
    auther:{type:Schema.Types.ObjectId,ref:'auther',required:true}
});

var Ideas = mongoose.model('Ideas',ideasSchema);

module.exports = Ideas;