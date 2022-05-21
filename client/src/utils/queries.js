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
      technology
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: ID!) {
    project(projectId: $projectId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      github
      projects {
        _id
        title
        description
        link
        contributors
        owner
      }
    }
  }
`;
