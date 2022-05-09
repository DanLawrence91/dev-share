const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: {
    type: String,
    required: "Please provide the title of your project",
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  description: {
    type: String,
    required: "Please leave a description of your project",
    minlength: 1,
    trim: true,
  },
  // use tech as an edit to project so can add to this? Or could edit other areas?
  // technology: [
  //   {
  //     type: String,
  //     trim: true,
  //   },
  // ],
  link: {
    type: String,
    required: "Please provide a link to your project repo",
    trim: true,
  },
  // need to link to user model so can use contact details and show on own dashboard
  owner: {
    type: String,
    required: true,
    trim: true,
  },
  contributors: {
    type: String,
    trim: true,
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
