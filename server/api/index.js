const express = require('express');
const corsConfig = {
    origin:"*",
    credential=true,
    methods:["GET","POST","PUT","DELETE"],
};
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


//Routes
const authRoutes =require('../routes/auth.js');
const noteRoutes =require('../routes/note.js');

mongoose.connect(process.env.MONGO_CONNECT)
if(mongoose.connect) {
    console.log('Connected to MongoDB');
}


app.use(express.json());

app.use(cors(corsConfig));
app.use('',authRoutes)
app.use('',noteRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use((err,req,res,next)=> {
    res.status(500).send("Oops an error occurred" + err.message)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


