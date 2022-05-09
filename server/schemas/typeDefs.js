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
`;

module.exports = typeDefs;

// owner in tech may be user - need to see how to link best
// also need to add in auth
