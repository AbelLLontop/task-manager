const jwt = require("jsonwebtoken");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const authMiddleware = (req,res,next)=>{
    try{
        const authorization = req.headers.authorization
        if(!authorization){
            return res.status(401).json({message:"Unauthorized"})
        }
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.userToken = payload;
        next();
    }catch(e){
        next(e)
    }
}

module.exports = authMiddleware;