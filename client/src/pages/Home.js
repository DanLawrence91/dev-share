import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Container, Text, Button, Stack, Icon, useColorModeValue, createIcon } from "@chakra-ui/react";

const Home = () => {
  const Arrow = createIcon({
    displayName: "Arrow",
    viewBox: "0 0 72 24",
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
        fill="currentColor"
      />
    ),
  });

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
          <Text color={"gray.500"}>Monetize your content by charging your most loyal readers and reward them loyalty points. Give back to your loyal readers by granting them access to your pre-releases and sneak-peaks.</Text>
          <Stack direction={"column"} spacing={3} align={"center"} alignSelf={"center"} position={"relative"}>
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              <Link to={"/projects"}>Projects</Link>
            </Button>

            <Box>
              <Icon as={Arrow} color={useColorModeValue("gray.800", "gray.300")} w={71} position={"absolute"} right={-71} top={"10px"} />
              <Text fontSize={"lg"} fontFamily={"Caveat"} position={"absolute"} right={"-125px"} top={"-15px"} transform={"rotate(10deg)"}>
                Starting at $15/mo
              </Text>
            </Box>
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
