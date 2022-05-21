import React from "react";
import { Link } from "react-router-dom";
import { Heading, Box, Center, Text, Stack, Button } from "@chakra-ui/react";

const ProjectsList = ({ projects }) => {
  // if (projects.length === 0) {
  //   return (
  //     <div>
  //       <Heading ml={20} my={50} fontSize={"xl"} fontFamily={"body"}>
  //         No Projects have been added yet!
  //       </Heading>
  //     </div>
  //   );
  // }

  return (
    <div>
      {projects &&
        projects.map((project) => (
          <div key={project._id}>
            <Center py={6} px={20}>
              <Box maxW={"320px"} w={"full"} bg={"green.50"} boxShadow={"2xl"} rounded={"lg"} p={6} textAlign={"center"}>
                <Text textAlign={"center"} color={"gray.700"} p={2}>
                  {project.description}
                </Text>

                {/* <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue('gray.50', 'gray.800')}
            fontWeight={'400'}>
            #music
          </Badge>
        </Stack> */}

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
            </Center>
          </div>
        ))}
    </div>
  );
};

export default ProjectsList;
