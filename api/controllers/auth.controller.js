import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';                                            // for passwords

export const signup = async (req, res) => {                                   // async await function using model and save in DataBase
  const { username, email, password } = req.body;  
  const hashedPassword = bcryptjs.hashSync(password, 10);                       // 
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created succesfully");                // success message
  } catch (error) {
    res.status(500).json(error.message);                                    // use await in try catch to send err to user
  }
 
};
