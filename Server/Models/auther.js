var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var autherSchema = new Schema({
    name:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    gender:{type:String,enum:['male','female','other'],required:true},
    profession:{type:String,required:true},
    User:{type:Schema.Types.ObjectId,ref:'User',required:true}
});

var auther = mongoose.model('auther',autherSchema);
module.exports = auther;
