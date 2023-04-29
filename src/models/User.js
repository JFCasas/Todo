var mongoose = require('mongoose')
var mongooseBcrypt = require('mongoose-bcrypt')

var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {type:String, required:true,unique:true},
    name : String,
    admin: {type:Boolean, default: false}
    
});
userSchema.plugin(mongooseBcrypt)
//Definimos el modelo
let User = mongoose.model("User",userSchema);

module.exports = User;