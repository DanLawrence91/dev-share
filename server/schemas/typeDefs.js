const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String
    surname: String
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
    technology: String
    link: String
    owner: String
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
    projects(username: String): [Thought]
    project(projectId: ID!): Project
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, github: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(title: String!, description: String!, link: String!, owner: String!): Project
    addComment(projectId: ID!, commentText: String!, commentAuthor: String!): Project
    removeProject(projectId: ID!): Project
    removeComment(projectId: ID!, commentId: ID!): Project
  }
`;

module.exports = typeDefs;

// owner in tech may be user - need to see how to link best
// also need to add in auth
//need to look at mutation edits as well
