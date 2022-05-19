import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProjectForm from "../components/ProjectForm";
import ProjectsList from "../components/ProjectsList";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { Heading } from "@chakra-ui/react";

const Dashboard = () => {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};
  console.log(user);
  console.log(userParam);

  if (Auth.loggedIn && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to share your thoughts. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
      </h4>
    );
  }
  return (
    <div>
      <div>
        <Heading>Please see a list of {userParam ? `${user.username}'s` : "your"} current projects below:</Heading>
        <ProjectsList projects={user.projects} />
      </div>
      {!userParam && (
        <div>
          <ProjectForm />
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// Show all of a users current projects that they have added
// If follow link through to single project owned by a user can edit and make it locked so no new comments/contributors and is closed - maybe change css??
// Also option to add new projects - will be a link
// This link will take to a modal to add a new project
