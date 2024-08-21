const express=require('express');
const router=express.Router();
const User=require('../models/User'); // ek level bahar jakar directory
const { body, validationResult } =require('express-validator'); 
const bcrypt=require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
//When a user logs in with their username and password, the server needs a way to 
//remember that the user is authenticated for subsequent requests.
//Instead of requiring the user to log in again for every action they take, 
//a token allows the server to remember that the user has already authenticated themselves.

const JWT_SECRET='HELLO$@world';  // secret info must be saved in environment variable

// ROUTE 1
//Create a User using POST "/api/auth/createUser"
router.post('/createUser',[
	  body('name','Enter a valid name').isLength({min:3}),
	  body('email','Enter a valid email').isEmail(),
	  body('password','Password must be atleast 5 characters').isLength({min:5}),
	]
	, async (req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
      	return res.status(400).json({success: false, errors: errors.array()});
      } 

   // check whether user with this email address already exists
   try 
   {
	   let user= await User.findOne({ email: req.body.email });
	   if(user){
	      return res.status(400).json({ success: false, error: "User with this email already exists!" });
	   }

	    const salt = await bcrypt.genSalt(10);
	    const hashedPassword=await bcrypt.hash(req.body.password,salt);
	    user= await User.create({
	    	name: req.body.name,
	    	password: hashedPassword,
	        email: req.body.email,
	    });

        const authtoken = jwt.sign({id: user.id},JWT_SECRET, { expiresIn: '1d' });
	    res.json({success: true,authtoken});

	    // json web token is made up of three parts: header,payload,signature
	}
	catch(error)
	{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
	}
});


// ROUTE 2
//Authenticate a User using POST "/api/auth/login"
router.post('/login',[
	   body('email','Enter a valid email').isEmail(),
	   body('password','Password cannot be blank').exists(),
	]
	, async (req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
      	return res.status(400).json({success: false, errors: errors.array()});
      } 

    const {email,password}=req.body;
    try
    {
	   let user= await User.findOne({email});
	   if(!user){
	      return res.status(400).json({success: false, error:"Invalid credentials !"});
	   }

	    const comparePassword= await bcrypt.compare(password, user.password);
	    if(!comparePassword)
	    {
	    	return res.status(400).json({success: false, error:"Invalid credentials !"});
	    }

        const authtoken = jwt.sign({id: user.id},JWT_SECRET, { expiresIn: '1d' });
         res.json({success: true,authtoken});
	}
	catch(error)
	{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
	}
});


// ROUTE 3
//Retrieve details of logged in user using POST "/api/auth/getUser"
router.post('/getUser',fetchUser, async (req,res)=>{
    try
    {
       userId=req.user.id;	// indexes are created on id as it is unique.
	   const user= await User.findById(userId).select("-password");
	   res.send(user);
	}
	catch(error)
	{
      console.error(error.message);
      res.status(500).send("Internal Server Error");
	}
});

module.exports=router;