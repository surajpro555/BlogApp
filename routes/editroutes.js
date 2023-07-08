const express = require('express')
const multer=require('multer')
const route = express.Router();
const blogmodel = require('../db/blogschema')
const { checkLogUser } = require('../middleware/authent')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,`./public/uploads`);
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null,fileName);
    }
});
const upload = multer({ storage: storage });


route.get('/:blogid', (req, res) => {
    res.render('editblog', { data: req.params.blogid });
});

module.exports=route;

route.post('/:blogid', checkLogUser, upload.single("coverImageUrl"), async (req, res) => {
    try {
        await blogmodel.findByIdAndDelete(req.params.blogid)
        await blogmodel.insertMany([{ title: req.body.title, body: req.body.body, coverImageUrl:`/uploads/${req.file?.filename}`,createdBy: req.user._doc._id }])
        res.redirect('/profile');
    } catch (err) {
        res.redirect('/profile')
        console.log(err);
    }
});