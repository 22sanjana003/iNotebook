const jwt = require("jsonwebtoken");
const JWT_SECRET='HELLO$@world'; 

const fetchUser = (req,res,next)=>{

	try 
	{
			// Get the user from jwt token and add id to req object
			const token=req.header('auth-token');
			if(!token){
				res.status(401).send({error:"Token missing"});
			}
			try 
			{
				// Verifying the JWT using the secret key 
				const decode = jwt.verify(token,JWT_SECRET);
				console.log(decode);
				// Storing the decoded JWT payload in the request object for further use
				req.user = decode;
			} 
			catch (error) 
			{
				// If JWT verification fails, return 401 Unauthorized response
				return res.status(401).json({ success: false, message: "token is invalid" });
			}

			// If JWT is valid, move on to the next middleware or request handler
			next();
	} 
	catch (error) {
		// If there is an error during the authentication process,
		// return 401 Unauthorized response
		return res.status(401).json({success: false,
			message:"Something Went Wrong While Validating the Token"});
	}	
}

module.exports=fetchUser;