import React from "react";

import { useQuery } from "@apollo/client";
import ProjectsList from "../components/ProjectsList";
import { QUERY_PROJECTS } from "../utils/queries";
import { Container, Flex, Heading, Text, Stack, StackDivider, Icon } from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";

const Projects = () => {
  const { data } = useQuery(QUERY_PROJECTS);

  const projects = data?.projects || [];

  const Feature = ({ text, icon, iconBg }) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
  };

  return (
    <Container maxW={"7xl"} py={12}>
      <Stack spacing={4}>
        <Text textTransform={"uppercase"} color={"blue.400"} fontWeight={600} fontSize={"sm"} bg={"blue.50"} p={2} alignSelf={"flex-start"} rounded={"md"}>
          Our Aim
        </Text>
        <Heading>A space to build experience and find projects to collaborate on!</Heading>
        <Text color={"gray.500"} fontSize={"lg"}>
          Welcome to the home of developer collaboration where beginners in the industry can find projects to work on and gain experience, whilst more experienced developers can find helping hands for their projects to free up their time to
          concentrate on more complex logic and code.
        </Text>
        <Stack spacing={4} divider={<StackDivider borderColor={"gray.100"} />}>
          <Feature
            icon={<Icon as={IoArrowForward} color={"yellow.500"} w={5} h={5} />}
            iconBg={"yellow.100"}
            text={"Feel free to browse through the projects shown. Click on a project to be taken to the project page where you can see more information about the project and how to contribute."}
          />
          <Feature
            icon={<Icon as={IoArrowForward} color={"green.500"} w={5} h={5} />}
            iconBg={"green.100"}
            text={"Once you have found a project you would like to work on, reach out to the owner with suggestions for the project or areas you would like to contribute to wihtin that project."}
          />
          <Feature
            icon={<Icon as={IoArrowForward} color={"purple.500"} w={5} h={5} />}
            iconBg={"purple.100"}
            text={"This is a community where we encourage beginners in the industry to build their network and find projects that they can contribute to and build connections with experienced developers looking for help."}
          />
        </Stack>
      </Stack>
      <Flex direction={"row"}>
        <ProjectsList projects={projects} title="Some projects looking for your help!" />
      </Flex>
    </Container>
  );
};

export default Projects;

// Page to show all projects on the website (for now). Show each project as a card (maybe like airbnb)
// Can improve by adding a search function by language or urgency?
// Each card will show title, owner, link
