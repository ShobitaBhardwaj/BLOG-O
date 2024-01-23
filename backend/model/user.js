//creating a schema for validation with the help of mongoose

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        validate: {
            validator: (value) => value.length > 0,
            message: 'Name is required'
          }
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate: {
            validator: (value) => value.length > 0,
            message: 'Username is required'
          }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate: {
            validator: (value) => value.length > 0,
            message: 'Password is required'
          }
    }
})

const user = mongoose.model('user',userSchema);

export default user;