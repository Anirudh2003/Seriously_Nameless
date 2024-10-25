const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Compylzer";
const { UserRouter }  = require('./routes/user');
const { EditorRouter } = require('./routes/editor');
const { ResumeBuilder } = require('./routes/resume');
const cookieParser = require('cookie-parser');


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Successfully🕹!!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};


const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser())
app.use('/auth', UserRouter);
app.use('/editor', EditorRouter);
app.use('/resume', ResumeBuilder);

app.get("/", (req,res) => {
    return res.json({"Port":"Listening on 8008"});
});

app.listen(8008, () => {
    connectToMongo();
    console.log("Listening on port 8008🚀!!")
});