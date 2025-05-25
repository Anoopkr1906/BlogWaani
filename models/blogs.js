const {Schema , model} = require("mongoose");
const { User} = require("./user.js") ; 

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageUrl:{
        type:String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    }
},{timestamps: true});


const Blog = model("Blog" , blogSchema);

module.exports = Blog ;