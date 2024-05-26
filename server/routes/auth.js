const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const User = require('../Schemas/User')
const jwt =require('jsonwebtoken')
const serviceAccount = require('../note-it-fdc8c-firebase-adminsdk-ko24v-9fa815fbab.json');
const { getAuth } = require('firebase-admin/auth')
const  { nanoid } =require('nanoid');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const generateUsername = async(email)=> {
    let username = email.split('@')[0];
    let isUsernameNotUnique = await User.findOne({ username });
    if (isUsernameNotUnique) {
        username += nanoid(5);
    }
    return username;
}

const infotosendtofrontend =(user) =>{
    let access_Token = jwt.sign("user",'9bRzG4v8K1pQwM3sN7yU2xVj5TzL6oA');
    return {
        name: user.name,
        email: user.email,
        username: user.username,
        id:user._id,
        accessToken: access_Token
    }
}
router.post('/', async (req, res,next) => {
    try {
        const { accessToken } = req.body;
        getAuth()
        .verifyIdToken(accessToken)
        .then(async (decodeduser) => {
            const { name, email } = decodeduser;
            const user = await User.findOne({ email });
            if(user) {
                return res.json(infotosendtofrontend(user));
            }
            const username = await generateUsername(email);
            const newUser = new User({ name, email ,username });
            await newUser.save();
            return res.json(infotosendtofrontend(newUser));
        })
    } catch (e) {
        next(e)
    }
})


module.exports = router;