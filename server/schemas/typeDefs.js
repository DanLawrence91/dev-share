const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    github: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    title: String
    description: String
    link: String
    owner: String
    contributors: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    projects: [Project]
    projectUser(username: String): [Project]
    project(projectId: ID!): Project
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, github: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String!, link: String!, owner: String!, contributors: String): Project
    updateProject(projectId: ID!, description: String, contributors: String): Project
    removeProject(projectId: ID!): Project
    addComment(projectId: ID!, commentText: String!): Project
    removeComment(projectId: ID!, commentId: ID!): Project
  }
`;

module.exports = typeDefs;

// owner in tech may be user - need to see how to link best
