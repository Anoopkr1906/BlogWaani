const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const router = Router() ;

const user = require('../models/user.js');
const Blog = require('../models/blogs.js');
const Comment = require('../models/comments.js');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});


const upload = multer({ storage: storage });

router.get('/add-new' , (req , res) =>{
    return res.render("addBlog" , {
        user : req.user,
        
    })
    
})

router.get('/:id' , async (req , res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");
    console.log("blog",blog);
    console.log("comments",comments);
    return res.render('blog' , {
        user : req.user,
        blog,
        comments,
    })
})

router.post('/comment/:blogId' , async(req , res) => {
    const comment = await Comment.create({
        content : req.body.content ,
        blogId : req.params.blogId,
        createdBy : req.user.id,
    })

    // Populate createdBy to get the full user object
    await comment.populate('createdBy');

    console.log(req.user);
    // console.log(comment.createdBy);
    // console.log(comment.createdBy.fullname);

    return res.redirect(`/blog/${req.params.blogId}`);
})

router.post('/' ,upload.single('coverImage') ,async (req , res) => {
    const {title , body} = req.body ;
    const blog = await Blog.create({
        body,
        title,
        coverImageUrl : `/uploads/${req.file.filename}`,
        createdBy : req.user.id,
    })
    return res.redirect(`/blog/${blog._id}`);
});



module.exports = router ;