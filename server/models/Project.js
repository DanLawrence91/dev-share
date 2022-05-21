const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  contributors: {
    type: String,
    trim: true,
  },
  technology: {
    type: String,
    required: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
    },
  ],
});

const Project = model("Project", projectSchema);

module.exports = Project;
