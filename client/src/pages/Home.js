import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Container maxW={"4xl"}>
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }} lineHeight={"110%"}>
            Find collaborators <br />
            <Text as={"span"} color={"blue.400"}>
              for your projects
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Find interesting projects to work on and build your experience. Starting out in your developer career is difficult to find projects to work on and push yourself out of your comfort zone. One of the best ways is to collaborate with fellow
            developers through shared or open source projects. By contributing to projects found on this website you will be joining a community committed to helping fellow developers grow and build their network. Take that first step today and find
            the project to help you change your future today!
          </Text>
          <Stack direction={"column"} spacing={3} align={"center"} alignSelf={"center"} position={"relative"}>
            <Button
              colorScheme={"green"}
              bg={"blue.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              <Link to={"/projects"}>Projects</Link>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;

// Introduction to website
// Text in middle
// Maybe show a picture or two - not sure of what yet
// May combine home and projects page
// Could show sample projects (maybe call past projects which now finished?)
