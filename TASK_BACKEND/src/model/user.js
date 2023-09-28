const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    photo:{
      url:{
        type:String,
      },
      fileName:{
        type:String,
      },
    },
    name:{
      type:String,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("users", UserSchema);
