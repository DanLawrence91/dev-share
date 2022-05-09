import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      github
      projects {
        _id
        title
        description
        link
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      title
      description
      link
      owner
    }
  }
`;

export const QUERY_USER_PROJECT = gql`
  query getUserProjects($username: String!) {
    projectUser(username: $username) {
      _id
      title
      description
      link
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: ID!) {
    projectUser(projectId: $projectId) {
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
