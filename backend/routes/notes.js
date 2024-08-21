const express=require('express');
const Note=require('../models/Note');
const router=express.Router();
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } =require('express-validator');

// ROUTE 1
//Add notes using POST "/api/notes/addNotes"
router.post('/addNotes',fetchUser, [
	  body('title','Enter a valid title').isLength({min:3}),
	  body('description','description must be atleast 5 characters').isLength({min:5})
	],
	async (req,res)=>{
		const errors = validationResult(req);
       if(!errors.isEmpty()) {
      	return res.status(400).json({errors: errors.array()});
      } 

    try
    {
	    const {title,description,tag}=req.body;
	    const note=new Note({
	       title,description,tag,user:req.user.id
	    })
	    const savedNote= await note.save()
	    res.json(savedNote);
	}
	catch(error)
	{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
	}
});


// ROUTE 2
//Get all notes using GET "/api/notes/fetchAllNotes"
router.get('/fetchAllNotes',fetchUser, async (req,res)=>{
	try{
		const notes= await Note.find({user: req.user.id});
        res.json(notes);
	}
	catch(error)
	{
		console.error(error.message);
        res.status(500).send("Internal Server Error");
	}
    
});

// ROUTE 3
//Update notes using PUT "/api/notes/updateNotes"
router.put('/updateNotes/:id',fetchUser, async (req,res)=>{
   const {title,description,tag}=req.body;
   // create a NewNote object
   const newNote={};
   if(title){newNote.title=title};
   if(description){newNote.description=description};
   if(tag){newNote.tag=tag};

 try {
	   // Find the note to be updated 
	   let note= await Note.findById(req.params.id);
	   if(!note){return res.status(404).send("Not Found")};

	   // Allow update only if the user owns this note
	   if(note.user.toString() !==req.user.id)
	   {
	   	return res.status(401).send("Not Allowed");
	   }

	   note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
	   res.json({note});
	}
	catch (error) 
	{
	    console.error(error.message);
	    res.status(500).send("Internal Server Error");
	}
});

// ROUTE 4
//delete notes using DELETE "/api/notes/deleteNotes"
router.delete('/deleteNotes/:id',fetchUser, async (req,res)=>{

 try {
	   // Find the note to be deleted
	   let note= await Note.findById(req.params.id);
	   if(!note){return res.status(404).send("Not Found")};

	   // Allow delete only if the user owns this note
	   if(note.user.toString() !==req.user.id)
	   {
	   	return res.status(401).send("Not Allowed");
	   }

	   note = await Note.findByIdAndDelete(req.params.id)
	   res.json({"Success":"Note has deleted successfully"});
	}
	catch (error) 
	{
	    console.error(error.message);
	    res.status(500).send("Internal Server Error");
	}
});

module.exports=router;