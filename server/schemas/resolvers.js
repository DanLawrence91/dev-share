// const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("projects");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("projects");
    },
    projects: async () => {
      return Project.find();
    },
    projectUser: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params);
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, github }) => {
      const user = await User.create({ username, email, password, github });
      return { user };
    },
    // need to do login but will do once covered auth
    addProject: async (parent, { title, description, link, owner }) => {
      const project = await Project.create({ title, description, link, owner });
      await User.findOneAndUpdate({ username: owner }, { $addToSet: { projects: project._id } });
      return project;
    },
    updateProject: async (parent, { projectId, description, contributors }) => {
      return Project.findOneAndUpdate({ _id: projectId }, { description }, { contributors }, { new: true });
    },
    removeProject: async (parent, { projectId }) => {
      return Project.findOneAndDelete({ _id: projectId });
    },
    addComment: async (parent, { projectId, commentText, commentAuthor }) => {
      return Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { comments: { commentText, commentAuthor } } }, { new: true, runValidators: true });
    },
    removeComment: async (parent, { projectId, commentId }) => {
      return Project.findOneAndUpdate({ _id: projectId }, { $pull: { comments: { _id: commentId } } }, { new: true });
    },
  },
};

module.exports = resolvers;
