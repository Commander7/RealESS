import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // for passwords
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; // protect values from users

export const signup = async (req, res, next) => {
  // async await function using model and save in DataBase
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); //
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created succesfully"); // success message
  } catch (error) {
    next(error); //(errorHandler(550, 'error from the custom function'));      well use await in try catch to send err to user app.use "next" in index.js
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));                        // function for signin
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest} = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
