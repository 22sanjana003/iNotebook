// installed package express,nodemon,mongoose,bcrypt,express-validator,jsonwebtoken
const connectToMongo=require('./db');
const express=require('express');
var cors = require('cors');
connectToMongo();

const app=express();
const port=5000;

app.use(cors())

// Middlewares
app.use(express.json());

// Setting up routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.get('/',(req,res)=>{
	res.send("Hello world!");
})

app.listen(port,()=>{
	console.log(`iNotebook backend listening at ${port}`);
})