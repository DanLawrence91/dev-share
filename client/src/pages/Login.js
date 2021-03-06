import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import auth from "../utils/auth";
import { Flex, Heading, Input, Text, Button, Stack, Box, Avatar, FormControl, FormLabel } from "@chakra-ui/react";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <Flex flexDirection="column" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="blue.500" />
        <Heading color="blue.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <div>
            {data ? (
              <Text>
                Heading <Link to="/">back to the homepage.</Link>
              </Text>
            ) : (
              <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
                <form onSubmit={handleFormSubmit}>
                  <FormControl isRequired p={3}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input type="email" placeholder="Your email" name="email" value={formState.email} onChange={handleChange} />
                  </FormControl>
                  <FormControl isRequired p={3}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input placeholder="Password" name="password" type="password" value={formState.password} onChange={handleChange} />
                  </FormControl>
                  <Button borderRadius={0} type="submit" variant="solid" colorScheme="blue" width={"full"}>
                    Login
                  </Button>
                </form>
              </Stack>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </Box>
      </Stack>
      <Box>
        New to the site?{" "}
        <Link to="/signup">
          <Text color="blue.500" fontWeight="bold">
            Sign Up
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
