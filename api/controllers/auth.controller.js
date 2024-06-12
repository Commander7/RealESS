import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';                                            // for passwords
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {                                   // async await function using model and save in DataBase
  const { username, email, password } = req.body;  
  const hashedPassword = bcryptjs.hashSync(password, 10);                       // 
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created succesfully");                // success message
  } catch (error) {
    next(error);       //(errorHandler(550, 'error from the custom function'));      well use await in try catch to send err to user app.use "next" in index.js
  }
 
};
