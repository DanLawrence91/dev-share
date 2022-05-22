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
        technology
        contributors
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
      contributors
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
      technology
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
        technology
        owner
      }
    }
  }
`;
