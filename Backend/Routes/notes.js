const express=require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Notes=require('../Models/Notes')
const fetchuser =require('../Middleware/fetchuser')

router.post('/addnote',[
    body("Title").isLength({min:5}),
    body("Description").exists()
],fetchuser,async(req,res)=>{
    const result=validationResult(req);
    if(result.isEmpty()){
       try{
        const userId=req.user.user_id;
        const notes=await Notes.create({
            user:userId,
            Title:req.body.Title,
            Tag:req.body.Tag,
            Description:req.body.Description,
        })
        res.send({notes});
       }catch(e){
       res.status(400).send({error:"Internal Server error: "+e});
       }
    }
    else{
        return res.status(400).json({error:result.array()});
    }
})

router.get("/fetchnotes",fetchuser, async(req,res)=>{
    const notes=await Notes.find({user:req.user.user_id});
    console.log(notes)
    res.send({notes});
})

router.put("/updatenote/:id",fetchuser,async(req,res)=>{
    const {Title, Description, Tag} = req.body;
    //creeate new notes obj
    const newNote={};
    if(Title){
        newNote.Title=Title
    }
    if(Tag){
        newNote.Tag=Tag
    }
    if(Description){
        newNote.Description=Description
    }

    //Find the note to be updated and update it

    try{
    let note= await Notes.findById(req.params.id);
    if(!note){
        console.log("Error update 1")
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!=req.user.user_id){
        console.log("Error  update 2")
        return res.status(401).send("Not Allowed!!");
    }
        note= await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.status(200).send(note);
    }catch(e){
        console.log("Error update 3")
        res.status(400).send({error:"Internal Server Error "+e});
    }
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const note_id=req.params.id;
    let note=null;
    try{
        note=await Notes.findById(note_id)
        if(!note){
            console.log("Error update 1")
            return res.status(400).send("Invalid request please delete an existing Note");
        }
        const user_id=note.user.toString();
        if(req.user.user_id!=user_id){
            console.log("Error delete 2")
            return res.status(401).send("Not Allowed to Delete");
        }
    }
    catch(e){
        console.log("Error delete 3")
    }
    try{
        note= await Notes.findByIdAndDelete(note_id);
        res.status(200).send({'Success':"Note deleted sucessfully ","Note":note});
    }
    catch(e){
        console.log("Error delete 4")
        res.status(400).send({error:"Internal Server Error "+e});
    }
})

module.exports=router;