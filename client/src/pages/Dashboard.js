import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProjectForm from "../components/ProjectForm";
import ProjectsList from "../components/ProjectsList";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { Container, SimpleGrid, Flex, Text, Stack, StackDivider } from "@chakra-ui/react";

import Auth from "../utils/auth";

const Dashboard = () => {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (Auth.loggedIn && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  const link = {
    color: "blue",
    textDecoration: "underline",
  };

  if (!Auth.loggedIn()) {
    return (
      <Text fontSize={"lg"} p={10}>
        You need to be logged in to share your thoughts. Please{" "}
        <Link to="/login" style={link}>
          login
        </Link>{" "}
        or{" "}
        <Link to="/signup" style={link}>
          signup.
        </Link>
      </Text>
    );
  }

  return (
    <Container maxW={"6xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text textTransform={"uppercase"} color={"blue.400"} fontWeight={600} fontSize={"sm"} bg={"blue.50"} p={2} alignSelf={"flex-start"} rounded={"md"}>
            {userParam ? `${user.username}'s` : "Your"} Profile
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Here you can see a list of {userParam ? `${user.username}'s` : "your"} current projects listed that are looking for people to collaborate with.
          </Text>
          {userParam && (
            <Text color={"gray.500"} fontSize={"lg"}>
              Contact them on {user.email} to get collaborating!
            </Text>
          )}
          {!userParam && (
            <Text color={"gray.500"} fontSize={"lg"}>
              {" "}
              Add new projects using the form on the right.
            </Text>
          )}
          <Stack spacing={4} divider={<StackDivider borderColor={"gray.100"} />}>
            <ProjectsList projects={user.projects} />
          </Stack>
        </Stack>
        <Flex>
          {!userParam && (
            <div>
              <ProjectForm />
            </div>
          )}
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;

// Show all of a users current projects that they have added
// If follow link through to single project owned by a user can edit and make it locked so no new comments/contributors and is closed - maybe change css??
// Also option to add new projects - will be a link
// This link will take to a modal to add a new project

// <div>
//     <div>
//       <Heading>Please see a list of {userParam ? `${user.username}'s` : "Your"} current projects below:</Heading>
//       <ProjectsList projects={user.projects} />
//     </div>
//     {!userParam && (
//       <div>
//         <ProjectForm />
//       </div>
//     )}
//   </div>
