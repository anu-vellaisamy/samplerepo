const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    name:{
         type: String,
         required: [true, "Name cannot be empty"],
         trim: true
    },
    email:{
        type: String,
        required: [true, "Email cannot be empty"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        lowercase: true
   },

   password:{
        type: String,
        required: [true, "password cannot be empty"]
   },

   address:{
        type: String,
        required: [true, "address cannot be empty"]
   },

   phonenumber:{
        type: String,
        required: [true, "Phone cannot be empty"]
   }

}, {  timestamps: true, versionKey: false })

module.exports = mongoose.model("Users", UserSchema);