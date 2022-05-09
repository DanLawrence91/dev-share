const { AuthenticationError } = require("apollo-server-express");
const { User, Project } = require("../models");
const { signToken } = require("../utils/auth");

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
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const loginError = "Incorrect credentials";
      if (!user) {
        throw new AuthenticationError(loginError);
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(loginError);
      }

      const token = signToken(user);

      return { token, user };
    },
    // need to add auth to each of below mutations so can only be done when logged in
    addProject: async (parent, { title, description, link, owner }, context) => {
      if (context.user) {
        const project = await Project.create({ title, description, link, owner });

        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { projects: project._id } });

        return project;
      }

      throw new AuthenticationError("You need to be logged in to add a project");
    },
    updateProject: async (parent, { projectId, description, contributors }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate({ _id: projectId }, { description }, { contributors }, { new: true });
      }

      throw new AuthenticationError("You need to be logged in to edit a project");
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
          owner: context.user.username,
        });

        await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { projects: project._id } });

        return project;
      }

      throw new AuthenticationError("You need to be logged in to delete a project");
    },
    addComment: async (parent, { projectId, commentText, commentAuthor }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate({ _id: projectId }, { $addToSet: { comments: { commentText, commentAuthor } } }, { new: true, runValidators: true });
      }

      throw new AuthenticationError("You need to be logged in to add a comment");
    },
    removeComment: async (parent, { projectId, commentId }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate({ _id: projectId }, { $pull: { comments: { _id: commentId, commentAuthor: context.user.username } } }, { new: true });
      }

      throw new AuthenticationError("You need to be logged in to delete a comment");
    },
  },
};

module.exports = resolvers;
