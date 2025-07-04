const JWT = require('jsonwebtoken');

const secret = "@noop@123"

function createTokenForUser(user){
    const payload = {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
    };

    const token = JWT.sign(payload , secret);
    return token;
}


function validateToken(token){
    const payload = JWT.verify(token , secret);
    return payload ; 
}


module.exports = {
    createTokenForUser,
    validateToken,
}