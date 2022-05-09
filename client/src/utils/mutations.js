import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $github: String!) {
    addUser(username: $username, email: $email, password: $password, github: $github) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($title: String!, $description: Sting!, $link: String!, $owner: String!) {
    addProject(title: $title, description: $description, link: $link, owner: $owner) {
      _id
      title
      description
      link
      owner
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProject($projectId: ID!, $description: String!, $contributors: String!) {
    updateProject(projectId: $projectId, description: $description, contributors: $contributors) {
      _id
      title
      description
      link
      owner
      contributors
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      projectId
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentText: String!, $commentAuthor: String!) {
    addComment(projectId: $projectId, commentText: $commentText, commentAuthor: $commentAuthor) {
      _id
      title
      description
      link
      owner
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($projectId: ID!, $commentId: ID!) {
    removeComment(projectId: $projectId, commentId: $commentId) {
      projectId
      commentId
    }
  }
`;
