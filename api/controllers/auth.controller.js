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
    if (!validPassword) return next(errorHandler(401, "wrong credentials")); // function for signin
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
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

export const google = async (req, res, next) => {
  //Google auth function
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // if user exist authenticate and signIn
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      }); //convert name well
      await newUser.save(); //await user and save
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error)
  }
}
