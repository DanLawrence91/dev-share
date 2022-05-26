import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Stack, Button, Heading, Badge } from "@chakra-ui/react";

const ProjectsList = ({ projects }) => {
  return (
    <div>
      <Flex direction={"row"} wrap={"wrap"} justifyContent={"center"}>
        {projects &&
          projects.map((project) => (
            <Flex py={6} key={project._id} mx={10} justifyContent={"center"}>
              <Box maxW={"320px"} w={"full"} bg={"blue.50"} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
                <Heading fontSize={"md"}>{project.title}</Heading>
                <Text textAlign={"center"} color={"gray.700"} p={2}>
                  {project.description}
                </Text>

                <Stack align={"center"} justify={"center"} direction={"row"} mb={6}>
                  <Badge px={2} py={1} bg={"gray.200"} fontWeight={"400"}>
                    #{"  "} {project.technology}
                  </Badge>
                </Stack>

                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"full"}
                  _focus={{
                    bg: "gray.200",
                  }}
                >
                  <Link to={`/projects/${project._id}`}>Check out this project</Link>
                </Button>
              </Box>
            </Flex>
          ))}
      </Flex>
    </div>
  );
};

export default ProjectsList;
