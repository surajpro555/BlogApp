const express = require('express')
const route = express.Router();
const blogmodel = require('../db/blogschema')
const { checkLogUser } = require('../middleware/authent')

route.get('/:blogid', checkLogUser, async (req, res) => {
    try {
        await blogmodel.findByIdAndDelete(req.params.blogid);
        res.redirect('/profile')
    } catch (error) {
        res.render('home')
        console.log(error);
    }
});

module.exports = route;  
