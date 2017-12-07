var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('md5');

var userSchema = new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
});

userSchema.methods.encryptPassword = function(){
    this.password = md5(this.password);
    console.log('your encrypted password is : '+this.password);
    return this.password;
};

var User = mongoose.model('User',userSchema);

module.exports = User;