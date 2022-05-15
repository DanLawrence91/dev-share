import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import { Flex, Heading, Input, Button, Text, InputGroup, Stack, InputLeftElement, Box, Avatar, FormControl } from "@chakra-ui/react";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <div>
            {data ? (
              <Text>
                Heading <Link to="/">back to the homepage.</Link>
              </Text>
            ) : (
              <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                <form onSubmit={handleFormSubmit}>
                  <FormControl>
                    <InputGroup p={2}>
                      <InputLeftElement pointerEvents="none" />
                      <Input type="text" placeholder="Your username" name="username" value={formState.username} onChange={handleChange} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup p={2}>
                      <InputLeftElement pointerEvents="none" />
                      <Input type="text" placeholder="Your github username" name="github" value={formState.github} onChange={handleChange} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup p={2}>
                      <InputLeftElement pointerEvents="none" />
                      <Input type="email" placeholder="Your email" name="email" value={formState.email} onChange={handleChange} />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup p={2}>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} />
                    </InputGroup>
                  </FormControl>
                  <Button m={2} borderRadius={0} type="submit" variant="solid" colorScheme="teal" width={"full"}>
                    Sign up
                  </Button>
                </form>
              </Stack>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
