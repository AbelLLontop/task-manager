const { comparePassword, encryptPassword } = require("../libs/encryptPassword");
const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

class AuthService{ 
    async login({email,password}){
        const user = await UserModel.findOne({email});
        if(!user){
            return false;
        }
        const isMatch = await comparePassword(password,user.password);
        if(!isMatch){
            return false;
        }
        const token = await this.createToken(user._id);
        return token;
    }
    async register({email,password,name}){
        const user = await UserModel.findOne({email});
        if(user){
            return false;
        }
        const hash = await encryptPassword(password);
        const newUser = await UserModel.create({
            email,
            password:hash,
            name,
            photo:{
                fileName:null,
                url:null
            }
        })
        const token = await this.createToken(newUser._id);
        return token;
    }
    async createToken(id){
        return await jwt.sign({id},JWT_SECRET,{expiresIn:"1d"});
    }
    logout(){
        const token = null;
        return token;      
    }

}

module.exports = AuthService;