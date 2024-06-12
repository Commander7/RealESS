import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,                                 // set of rules to user
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);                    // create model


export default User;