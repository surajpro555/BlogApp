const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieparser = require('cookie-parser')
require('dotenv').config()
const blogmodel = require('./db/blogschema')
const { loginController, signController } = require('./controllers/userController')
const { createBlogController } = require('./controllers/blogController')
const { checkLogUser } = require('./middleware/authent')


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieparser())



mongoose.connect(process.env.URL).then(() => {
  console.log('database sucessfully connected.....');
}).catch((err) => {
  console.log('database not connected.....', err);
})


app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) => res.render('login'));
app.get('/sign', (req, res) => res.render('sign'));
app.get('/logout', (req, res) => res.clearCookie('uid').redirect('/login'));
app.get('/create-blog', checkLogUser, (req, res) => res.render('create-blog'));
app.get('/Blogs', checkLogUser, async (req, res) => {
  try {
    const allBlogs = await blogmodel.find({});
    res.render('Blogs', { data: allBlogs.reverse() });
  } catch (err) {
    res.render('home');
    console.log(err);
  }
});

const usermodel=require('./db/userschema');

app.get('/Blogs/:blogid', checkLogUser, async (req, res) => {
  try {
    const currBlog= await blogmodel.findById(req.params.blogid);
    const author=await usermodel.findById(currBlog.createdBy);
    res.render('eachBlog',
      { title:currBlog.title,
       body:currBlog.body,
       date:currBlog.date ,
       image:currBlog.coverImageUrl,
       author:author.username 
      });
  } catch (err) {
    res.render('home');
    console.log(err);
  }
});


app.get('/profile', checkLogUser, async (req, res) => {
  try {
    const myBlogs = await blogmodel.find({ createdBy: req.user._doc._id })
    res.render('profile', { data: myBlogs.reverse() });
  } catch (err) {
    res.render('home');
    console.log(err);
  }
});

app.get('/editblog/:blogid', (req, res) => {
   res.render('editblog', { data: req.params.blogid });
});

app.get('/deleteblog/:blogid', checkLogUser, async (req, res) => {
  try {
    await blogmodel.findByIdAndDelete(req.params.blogid);
    res.redirect('/profile')
  } catch (error) {
    res.render('/profile')
    console.log(error);
  }
});

app.post('/sign', signController);
app.post('/login', loginController)
app.post('/create-blog', checkLogUser, createBlogController);

app.post('/editblog/:blogid',checkLogUser,async (req, res) => {
  try {
    await blogmodel.findByIdAndDelete(req.params.blogid)
    await blogmodel.insertMany([{ title: req.body.title, body: req.body.body, createdBy: req.user._doc._id }])
    res.redirect('/profile');
  } catch (err) {
    res.redirect('/profile')
    console.log(err);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server connected.....')
});