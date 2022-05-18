import React from "react";
// import { Navigate, useParams, Link } from "react-router-dom";
// import { useQuery } from "@apollo/client";
import ProjectForm from "../components/ProjectForm";
// import ProjectsList from "../components/ProjectsList";
// import { QUERY_USER, QUERY_ME } from "../utils/queries";

// import Auth from "../utils/auth";
// import { Heading, Text } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <div>
      <div>
        <ProjectForm />
      </div>
    </div>
  );
};

export default Dashboard;

// Show all of a users current projects that they have added
// If follow link through to single project owned by a user can edit and make it locked so no new comments/contributors and is closed - maybe change css??
// Also option to add new projects - will be a link
// This link will take to a modal to add a new project
