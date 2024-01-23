import mongoose from "mongoose";
//Creating this file to save the tokens
const tokenSchema = mongoose.Schema({
    token : {
        type : String,
        required : true
    }
})

const token = mongoose.model('token', tokenSchema);

export default token;