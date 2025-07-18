
const {Router} = require('express');
const User = require('../models/user');
const router = Router() ;
const {createTokenForUser} = require('../services/authentication.js')
const {validateToken} = require('../services/authentication.js')


router.get('/signin' , (req , res) =>{
    return res.render("signin")
});

router.get('/signup' , (req , res) =>{
    return res.render("signup")
});

router.post('/signin' , async (req , res) => {
    const {email , password} = req.body ;
    try{
        const token = await User.matchPasswordAndGenerateToken(email , password);
        return res.cookie('token', token).redirect('/');
    }
    catch(error){
        console.log(error);
        return res.render('signin' ,{
            error : "Incorrect email or password"
        })
    }
   
});

router.get('/logout' , (req,res) => {
    return res.clearCookie('token').redirect('/');
})


router.post('/signup' ,async (req , res) =>{
    const {fullname , email , password} = req.body ;
    await User.create({
        fullname,
        email,
        password,
    });

    return res.redirect('/');
})

module.exports = router ;