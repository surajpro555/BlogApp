const express = require('express')
const route = express.Router();
const blogmodel = require('../db/blogschema')
const usermodel=require('../db/userschema');
const { checkLogUser } = require('../middleware/authent')


route.get('/', checkLogUser, async (req, res) => {
    try {
        const allBlogs = await blogmodel.find({});
        res.render('Blogs', { data: allBlogs.reverse() });
    } catch (err) {
        res.render('home');
        console.log(err);
    }
});


route.get('/:blogid', checkLogUser, async (req, res) => {
    try {
        const currBlog = await blogmodel.findById(req.params.blogid);
        const author = await usermodel.findById(currBlog.createdBy);
        res.render('eachBlog',
            {
                title: currBlog.title,
                body: currBlog.body,
                date: currBlog.date,
                image: currBlog.coverImageUrl,
                author: author.username
            });
    } catch (err) {
        res.render('home');
        console.log(err);
    }
});

module.exports=route;