import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ProjectForm from "../components/ProjectForm";
import ProjectsList from "../components/ProjectsList";
import { QUERY_ME } from "../utils/queries";
import { Container, SimpleGrid, Flex, Text, Stack, StackDivider } from "@chakra-ui/react";
import auth from "../utils/auth";

const Dashboard = () => {
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const link = {
    color: "blue",
    textDecoration: "underline",
  };

  if (!auth.loggedIn()) {
    return (
      <Text fontSize={"lg"} p={10}>
        You need to be logged in to share your view the dashboard. Please{" "}
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
            Your Profile
          </Text>

          <Stack spacing={4} divider={<StackDivider borderColor={"gray.100"} />}>
            <ProjectsList projects={user.projects} />
          </Stack>
        </Stack>
        <Flex>
          <ProjectForm />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;
