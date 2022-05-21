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

// const { data } = useQuery(QUERY_PROJECTS);

//   const projects = data?.projects || [];

//   const Feature = ({ text, icon, iconBg }) => {
//     return (
//       <Stack direction={"row"} align={"center"}>
//         <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"} bg={iconBg}>
//           {icon}
//         </Flex>
//         <Text fontWeight={600}>{text}</Text>
//       </Stack>
//     );
//   };

//   return (
//     <Container maxW={"6xl"} py={12}>
//       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
//         <Stack spacing={4}>
//           <Text textTransform={"uppercase"} color={"blue.400"} fontWeight={600} fontSize={"sm"} bg={"blue.50"} p={2} alignSelf={"flex-start"} rounded={"md"}>
//             Our Aim
//           </Text>
//           <Heading>A space to build experience and find projects to collaborate on!</Heading>
//           <Text color={"gray.500"} fontSize={"lg"}>
//             Welcome to the home of developer collaboration where beginners in the industry can find projects to work on and gain experience, whilst more experienced developers can find helping hands for their projects to free up their time to
//             concentrate on more complex logic and code.
//           </Text>
//           <Stack spacing={4} divider={<StackDivider borderColor={"gray.100"} />}>
//             <Feature
//               icon={<Icon as={IoArrowForward} color={"yellow.500"} w={5} h={5} />}
//               iconBg={"yellow.100"}
//               text={"Feel free to browse through the projects shown. Click on a project to be taken to the project page where you can see more information about the project and how to contribute."}
//             />
//             <Feature
//               icon={<Icon as={IoArrowForward} color={"green.500"} w={5} h={5} />}
//               iconBg={"green.100"}
//               text={"Once you have found a project you would like to work on, reach out to the owner with suggestions for the project or areas you would like to contribute to wihtin that project."}
//             />
//             <Feature
//               icon={<Icon as={IoArrowForward} color={"purple.500"} w={5} h={5} />}
//               iconBg={"purple.100"}
//               text={"This is a community where we encourage beginners in the industry to build their network and find projects that they can contribute to and build connections with experienced developers looking for help."}
//             />
//           </Stack>
//         </Stack>
//         <Flex>
//           <ProjectsList projects={projects} title="Some projects looking for your help!" />
//         </Flex>
//       </SimpleGrid>
//     </Container>
