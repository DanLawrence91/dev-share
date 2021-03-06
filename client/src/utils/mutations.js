import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($title: String!, $description: String!, $link: String!, $contributors: String, $technology: String!) {
    addProject(title: $title, description: $description, link: $link, contributors: $contributors, technology: $technology) {
      _id
      title
      description
      link
      contributors
      technology
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
      _id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($projectId: ID!, $commentText: String!) {
    addComment(projectId: $projectId, commentText: $commentText) {
      _id
      title
      description
      link
      owner
      contributors
      comments {
        _id
        commentText
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
