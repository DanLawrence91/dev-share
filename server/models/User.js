const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Provided email is invalid"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  github: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

// need to add authentication stuff after lecture 9/6/22

const User = model("User", userSchema);

module.exports = User;
