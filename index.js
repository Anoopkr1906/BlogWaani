const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { checkForAuthenticationCookie } = require('./middlewares/authentication.js');

const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.js'); 
const blogRoutes = require('./routes/blog.js'); 

const Blog = require('./models/blogs.js');

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/Anoopblogify').then((e) =>console.log("Mongodb Connected"))

app.set('view engine', 'ejs');
app.set("views" , path.resolve("./views"));
app.use(express.urlencoded({extended : false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))

// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

app.use(express.static(path.resolve('./public')));


app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home' , {
        user : req.user,
        blogs : allBlogs,
    });
});

app.use('/user' , userRoutes)
app.use('/blog' , blogRoutes);

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

