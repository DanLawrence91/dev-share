import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_PROJECT } from "../utils/mutations";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import auth from "../utils/auth";
import { Heading, Text, Icon, Stack, Flex, StackDivider, Button } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import { MdDescription, MdShare, MdComment } from "react-icons/md";
import UpdateModal from "../components/UpdateModal";

const SingleProject = () => {
  const { projectId } = useParams();

  const { data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const { data } = await removeProject({
        variables: {
          projectId: projectId,
        },
      });

      window.location.assign("/");
    } catch (e) {
      console.error(e);
    }
  };

  const link = {
    color: "blue",
    textDecoration: "underline",
  };

  const username = {
    textDecoration: "underline",
  };

  const github = {
    color: "blue",
    fontWeight: "bold",
    textDecoration: "underline",
    paddingLeft: 40,
  };

  const Feature = ({ text, icon }) => {
    return (
      <Stack direction={"row"} align={"center"}>
        <Flex w={8} h={8} align={"center"} justify={"center"} rounded={"full"}>
          {icon}
        </Flex>
        <Text fontWeight={600}>{text}</Text>
      </Stack>
    );
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
    <div>
      {auth.getProfile().data.username === project.owner ? (
        <div>
          <Stack direction={"row"} justifyContent={"space-between"} px={5} mt={2}>
            <Heading fontSize={"3xl"} mt={5} mx={5} color={"blue.700"} fontStyle={"italic"}>
              Here is your project - {project.title}
            </Heading>
            <Stack>
              <Button onClick={handleDelete}>Delete your project</Button>
              <UpdateModal projectId={project._id} description={project.description} contributors={project.contributors} />
            </Stack>
            {error && <div>{error.message}</div>}
          </Stack>
          <Stack spacing={2} divider={<StackDivider borderColor={"gray.100"} />} p={3}>
            <Text mx={4}>Please see some more information regarding the project below:</Text>

            <Feature icon={<Icon as={MdDescription} color={"yellow.500"} w={5} h={5} />} text={project.description} />
            <Feature icon={<Icon as={MdShare} color={"purple.500"} w={5} h={5} />} text={`People currently contributing to this project include: ${project.contributors}`} />
            <Feature icon={<Icon as={IoLogoGithub} w={7} h={7} />} text={`Follow the link below to the github repository: `} />
            <div>
              <a style={github} href={`${project.link}`}>
                {project.link}
              </a>
            </div>
            <Feature icon={<Icon as={MdComment} w={5} h={5} />} text={`Here is what others think of the project: `} />

            <Comments comments={project.comments} />
            <CommentForm projectId={project._id} />
          </Stack>
        </div>
      ) : (
        <div>
          <Heading fontSize={"3xl"} mx={10} mt={5} color={"blue.700"} fontStyle={"italic"}>
            <Link style={username} to={`/profile/${project.owner}`}>
              {project.owner}
            </Link>{" "}
            is looking for assistance with their project {project.title}
          </Heading>
          <Text fontSize={"md"} mx={10} color={"blue.200"}>
            (Click on their username to see their profile with all their current projects listed)
          </Text>
          <Stack spacing={2} divider={<StackDivider borderColor={"gray.100"} />} p={3}>
            <Text mx={4}>Please see some more information regarding the project below:</Text>

            <Feature icon={<Icon as={MdDescription} color={"yellow.500"} w={5} h={5} />} text={project.description} />
            <Feature icon={<Icon as={MdShare} color={"purple.500"} w={5} h={5} />} text={`People currently contributing to this project include: ${project.contributors}`} />
            <Feature icon={<Icon as={IoLogoGithub} w={7} h={7} />} text={`Follow the link below to the github repository: `} />
            <div>
              <a style={github} href={`${project.link}`}>
                {project.link}
              </a>
            </div>
            <Feature icon={<Icon as={MdComment} w={5} h={5} />} text={`Here is what others think of the project: `} />

            <Comments comments={project.comments} />
            <CommentForm projectId={project._id} />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default SingleProject;

// Will show in detail about one project
// Title and owner contact details at top
// Section for description below
// Maybe list of tech below this in column with comments next to it
// Also will show contributors list
// Maybe think about function to close project when complete? Make it no longer editable
// if project owned by user they can have edit button to edit the description and contributors

// cache stuff
// , {
//   update(cache, { data: { removeProject } }) {
//     try {
//       const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

//       cache.writeQuery({
//         query: QUERY_PROJECTS,
//         data: { projects: projects.filer((project) => project._id !== removeProject._id) },
//       });
//     } catch (e) {
//       console.error(e);
//     }

//     const { me } = cache.readQuery({ query: QUERY_ME });
//     cache.writeQuery({
//       query: QUERY_ME,
//       data: { me: { ...me, projects: [removeProject] } },
//     });
//   },
// }
