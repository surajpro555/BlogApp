const express = require('express')
const route = express.Router();
const blogmodel = require('../db/blogschema')
const usermodel = require('../db/userschema');
const { checkLogUser } = require('../middleware/authent')

route.get('/', checkLogUser, async (req, res) => {
    try {
        const user = await usermodel.findById(req.user._doc._id);
        const myBlogs = await blogmodel.find({ createdBy: req.user._doc._id })
        res.render('profile', { data: myBlogs.reverse(), loguser: user });
    } catch (err) {
        res.render('home');
        console.log(err);
    }
});

module.exports = route;