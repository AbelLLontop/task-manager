const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const {schemaUser,schemaUserCredentials,schemaUserUpdate} = require("../validator/User");
const JWT_SECRET = process.env.JWT_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL;

const deleteFile = (path)=>{
    try{
        fs.unlinkSync(path,e=>console.log(e));
    }catch(e){
        console.log(e.message);
    }
}

const updateUser = async (req,res,next)=>{
    try{ 
        const {id} = req.userToken;
        const {body}=req;
        const {email,name,newPassword,password} = await schemaUserUpdate.validate(body,{strict:true,abortEarly:false});    
        const {file}=req;
        const userExist = await UserModel.findById(id);
        if(!userExist){
            if(file){
                deleteFile(file.path);
            }
            return res.status(404).json({message:"User not found"});
        }
        if(email && email !== userExist.email){
            const userExistWithEmail = await UserModel.findOne({email});
            if(userExistWithEmail){
                if(file){
                    deleteFile(file.path);
                }
                return res.status(400).json({message:"User already exists"});
            }
        }
        let fileData = null
        if(file){
            fileData = {
                fileName:file.filename,
                url:`${PUBLIC_URL}/${file.filename}`
            }
            if(userExist?.photo){
                const fileName = userExist.photo.fileName;
                const pathForDelete = file.destination+"/"+fileName;
                deleteFile(pathForDelete);
            }
        }
        if(password){
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(404).json({message:"Invalid credentials"});
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(newPassword,salt);
            user.password = hash;
        }
        userExist.email = email || userExist.email;
        userExist.name = name ||userExist.name;
        userExist.photo = fileData || userExist.photo;
        const data = await UserModel.findOneAndUpdate({_id:id},userExist,{new:true});
        data.set("password",undefined,{strict:false});
        res.send({data});
    }catch(e){
        next(e)
    }
}

const registerUser = async (req,res,next)=>{
    try{
        const {body}=req;
        const {email,password,name} = await schemaUser.validate(body,{strict:true,abortEarly:false});
        
        const userExist = await UserModel.findOne({email});
        if(userExist){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await UserModel.create({
            email,
            password:hash,
            name,
            photo:null,
        });
        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
        const data = {
            token,
            user
        }
        res.status(200).json({data});
    }catch(e){
        console.log(e);
        next(e)
    }
}

const loginUser = async (req,res,next)=>{
    try{
        const {email,password} = await schemaUserCredentials.validate(req.body,{strict:true,abortEarly:false});
        const user = await UserModel.findOne({email},{
            updatedAt:0,
            createdAt:0,
            role:0
        });
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:"Invalid credentials"});
        }
        user.set("password",undefined,{strict:false});
        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:"1d"});
        const data = {
            token,
            user
        }
        res.status(200).json({data});
    }catch(e){
        next(e)
    }
}


module.exports = {
    registerUser,
    loginUser,
    updateUser
}