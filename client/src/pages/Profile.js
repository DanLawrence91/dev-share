import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProjectsList from "../components/ProjectsList";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { Container, Text, Stack, StackDivider } from "@chakra-ui/react";
import auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.me || data?.user || {};

  if (auth.loggedIn && auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  const link = {
    color: "blue",
    textDecoration: "underline",
  };

  if (!auth.loggedIn()) {
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
      <Stack spacing={4}>
        <Text textTransform={"uppercase"} color={"blue.400"} fontWeight={600} fontSize={"sm"} bg={"blue.50"} p={2} alignSelf={"flex-start"} rounded={"md"}>
          {user.username}'s Profile
        </Text>
        <Text color={"gray.500"} fontSize={"lg"}>
          Here you can see a list of their current projects that need fellow developers to collaborate with.
        </Text>
        <Text color={"gray.500"} fontSize={"lg"}>
          Contact them on <a href={`mailto:${user.email}`}>{user.email}</a> to get collaborating!
        </Text>

        <Stack spacing={4} divider={<StackDivider borderColor={"gray.100"} />}>
          <ProjectsList projects={user.projects} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Profile;
