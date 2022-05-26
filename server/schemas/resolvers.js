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
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("projects");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      const loginError = "Incorrect email or password";
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
    addProject: async (parent, { title, description, link, owner, contributors, technology }, context) => {
      if (context.user) {
        const project = await Project.create({ title, description, link, owner, contributors, technology });

        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { projects: project._id } });

        return project;
      }

      throw new AuthenticationError("You need to be logged in to add a project");
    },
    updateProject: async (parent, { projectId, description, contributors }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate({ _id: projectId }, { description, contributors }, { new: true });
      }

      throw new AuthenticationError("You need to be logged in to edit a project");
    },
    removeProject: async (parent, { projectId }, context) => {
      if (context.user) {
        const project = await Project.findOneAndDelete({
          _id: projectId,
        });

        await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { projects: project._id } });

        return project;
      }

      throw new AuthenticationError("You need to be logged in to delete a project");
    },
    addComment: async (parent, { projectId, commentText }, context) => {
      if (context.user) {
        return Project.findOneAndUpdate(
          { _id: projectId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
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
