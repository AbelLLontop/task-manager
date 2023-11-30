import jwt from "jsonwebtoken";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json(["The email already exists" ]);
    const passwordHas = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: passwordHas,
      username,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["User not found"]);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json([ "Invalid credentials" ]);
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json(["User not found"]);
  return res.json({
    id: userFound._id,
    email: userFound.email,
    username: userFound.username,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req,res)=>{
  const {token} = req.cookies;
  if(!token) return res.status(401).json(["Invalid token"]);
  jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
    if(err) return res.status(401).json(["Invalid token"]);
    const userFound = User.findById(decoded.id);
    if(!userFound) return res.status(401).json(["Invalid token"]);
    return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  })
}