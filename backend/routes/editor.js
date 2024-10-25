const express = require('express');
const EditorRouter = express.Router();
const { generateFile } = require('../EditorFiles/generateFile');
const Job = require('../models/Job');
const { addJobToQueue } = require('../EditorFiles/jobQueue');

EditorRouter.post("/run",async (req,res) => {
    const { language = "py", code } = req.body;
    console.log("language: ",language);
    console.log("code: ",code);
    if(code === undefined){
        return res.status(400).json({success:false, error:"No code Provided!!"});
    }

    let job;
    try{
        const filePath = await generateFile(language, code);
        
        job = await new Job({language, filePath}).save();
        const jobID = job["_id"];
        addJobToQueue(jobID);
        
        // response that the code is running will be sent back to the user but the further processing continues....
        res.status(201).json({success: true, jobID});
    } catch(err){
        res.status(500).json({success: false, err: JSON.stringify(err)});
    }
        
        
    
});

EditorRouter.get("/status", async (req, res) => {
    const jobID = req.query.id;
    console.log("status requested", jobID);
    if(jobID == undefined){
        res.status(400).json({success: false, error: "Missing ID query param!!"});
    }

    try{
        const job = await Job.findById(jobID);

        if(job === undefined){
            return res.status(404).json({success: false, error: "Invalid JobID!!"});
        }

        return res.status(200).json({success: true, job});
    } catch(err){
        return res.status(400).json({success: false, error: JSON.stringify(err)});
    }
});

module.exports = {
    EditorRouter,
}