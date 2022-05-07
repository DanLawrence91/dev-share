const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  technology: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  // need to link to user model so can use contact details and show on own dashboard
  owner: {
    type: String,
    required: true,
  },
});

const Project = model("project", projectSchema);

module.exports = Project;
