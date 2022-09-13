const mongoose = require("mongoose");
const crypto = require('node:crypto');
const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {timestamps: true});



userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password
})



userSchema.method = {
    // Checks ths hashed password is same or not
    authenticate: function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password
    },
    
    // Method to Encryped the password
    securePassword: function(plainPassword){
        if(!plainPassword) return ""
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}



module.exports = mongoose.Model("User", userSchema);