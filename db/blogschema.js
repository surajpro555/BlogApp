const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },
    body: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        default: '/img/blog-mage.png'
    },
    createdBy: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
     }
},{timestamps: true});

const blogmodel = new mongoose.model('blog',BlogSchema);

module.exports =blogmodel;