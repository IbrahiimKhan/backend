const mongoose = require('mongoose')
const crypto = require('crypto')
const uuid = require('uuid')


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:32
    },
    hashed_password:{
        type:String,
        required:true,
        
    },
    about:{
        type:String,
        trim:true
        
    },
    salt:String,
    role:{
        default:0,
        type:Number
    },
    history:{
        type:Array,
        default:[]
    },
    
},{timestamps:true})


// virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuid.v1();
    this.hashed_password = this.enCryptPassword(password)
})
.get(function(){
    this._password
})


userSchema.methods = {

    authenticate: function(plainText){
return this.enCryptPassword(plainText) === this.hashed_password;
    },
    enCryptPassword: function(password){
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return '';

        }
    }
}


module.exports = mongoose.model("User", userSchema)