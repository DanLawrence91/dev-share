import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Flex, Heading, Input, Text, Button, InputGroup, Stack, InputLeftElement, Box, Avatar, FormControl } from "@chakra-ui/react";

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
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: "",
      password: "",
    });
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
          <Text color="teal.500" fontWeight="bold">
            Sign Up
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
