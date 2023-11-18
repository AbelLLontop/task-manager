const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


module.exports = mongoose.model("tasks",TaskSchema);