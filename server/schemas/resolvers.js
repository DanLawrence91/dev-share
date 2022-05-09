const { AuthenticationError } = require("apollo-server-express");
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
    projects: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Project.find(params);
    },
    project: async (parent, { projectId }) => {
      return Project.findOne({ _id: projectId });
    },
  },
};

module.exports = resolvers;
