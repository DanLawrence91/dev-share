import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import { Heading, Input, Button, Stack, FormControl, FormLabel, Textarea } from "@chakra-ui/react";

const ProjectForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    link: "",
    owner: "",
    contributors: "",
  });

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: { projects: [addProject, ...projects] },
        });
      } catch (e) {
        console.error(e);
      }

      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, projects: [...me.projects, addProject] } },
      // });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addProject({
        variables: {
          ...formState,
        },
      });

      setFormState({
        title: "",
        description: "",
        link: "",
        owner: "",
        contributors: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Heading>What project are you looking to collaborate one?</Heading>

          <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
            <form onSubmit={handleFormSubmit}>
              <FormControl isRequired p={3}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input type="text" placeholder="Project title" name="title" value={formState.title} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired p={3}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea type="text" placeholder="Project description" name="description" value={formState.description} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired p={3}>
                <FormLabel htmlFor="link">Link</FormLabel>
                <Input placeholder="Project Link" name="link" type="text" value={formState.link} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired p={3}>
                <FormLabel htmlFor="owner">Owner</FormLabel>
                <Input placeholder="Please enter your username" name="owner" type="text" value={formState.owner} onChange={handleChange} />
              </FormControl>
              <FormControl p={3}>
                <FormLabel htmlFor="contributors">Contributors</FormLabel>
                <Input placeholder="Please enter any contributors" name="contributors" type="text" value={formState.contributors} onChange={handleChange} />
              </FormControl>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width={"full"}>
                Add Project
              </Button>
            </form>
            {error && <div>{error.message}</div>}
          </Stack>
        </>
      ) : (
        <p>
          You must be logged in to add a project - please go to the <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> pages.
        </p>
      )}
    </div>
  );
};

export default ProjectForm;

// auth.loggedin() showing true but giving error???
