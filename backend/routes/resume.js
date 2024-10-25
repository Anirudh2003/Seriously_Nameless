const express = require('express');
const ResumeBuilder = express.Router();

ResumeBuilder.post('/generate-resume', async (req, res) => {
    const data = req.body;
    console.log(data);
    
    console.log(data.formData.education)

    return res.json({message: "Reached to resume.js"});
});

module.exports = {
    ResumeBuilder,
};