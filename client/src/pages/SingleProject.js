import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";
import { Heading, Text, Icon, Stack, Flex, StackDivider } from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import { MdDescription, MdShare, MdComment } from "react-icons/md";

const SingleProject = () => {
  const { projectId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId },
  });

  const project = data?.project || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const link = {
    color: "blue",
    textDecoration: "underline",
  };

  const username = {
    textDecoration: "underline",
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

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
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
            {/* Need to add functioning github link here */}
            <Feature icon={<Icon as={IoLogoGithub} w={7} h={7} />} text={`Follow this link to the github repository: <a href=${project.link}>Github repo</a>`} />
            <Feature icon={<Icon as={MdComment} w={5} h={5} />} text={`Here is what others thing of the project: `} />
            <Comments comments={project.comments} />
            <CommentForm projectId={project._id} />
          </Stack>
        </>
      ) : (
        <Text fontSize={"lg"} p={10}>
          You must be logged in to add a project - please go to the{" "}
          <Link to="/login" style={link}>
            login
          </Link>{" "}
          or{" "}
          <Link to="/signup" style={link}>
            sign up
          </Link>{" "}
          pages.
        </Text>
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
