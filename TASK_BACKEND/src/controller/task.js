const TaskModel = require("../model/task");
const UserModel = require("../model/user");

const getAllTasks = async (req,res,next)=>{
    try{
        const data = await TaskModel.find();
        res.send({data})
    }catch(e){
        next(e)
    }

    
}
const getTasksByIdUser = async (req,res,next)=>{
    try{
        const {id} = req.userToken;
        const user = await UserModel.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const data = await TaskModel.find({user:id});
        res.send({data});

    }catch(e){
        next(e)
    }
}

const updateTask = async (req,res,next)=>{
    try{
        const idUser = req.userToken.id;
        const {id} = req.params
        const {body} = req;
        const data = await TaskModel.findOneAndUpdate({_id:id,user:idUser},body,{new:true});
        if(!data){
            return res.status(404).json({message:"Task not found"});
        }
        res.send({data});
    }catch(e){
        next(e)
    }

}
const deleteTask = async (req,res,next)=>{
    try{
        const idUser = req.userToken.id;
        const {id}=req.params;
        const data = await TaskModel.findOneAndDelete({_id:id,user:idUser});
        if(!data){
            return res.status(404).json({message:"Task not found"});
        }
        res.send({data});

    }catch(e){
        next(e)
    }

}
const getTask = async(req,res,next)=>{
    try{
        const idUser = req.userToken.id;
        const {id} = req.params;
        const data = await TaskModel.findOne({_id:id,user:idUser});
        if(!data){
            return res.status(404).json({message:"Task not found"});
        }
        res.send({data});

    }catch(e){
        next(e)
    }

}

module.exports={
    getAllTasks,
    getTasksByIdUser,
    updateTask,
    deleteTask,
    getTask
}