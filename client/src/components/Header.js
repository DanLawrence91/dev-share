import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";
import Auth from "../utils/auth";

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Flex as="nav" direction={{ base: "column", lg: "row" }} w="100vw" align="center" justify="space-between" wrap="wrap" p={8} color="blue.700" bg="yellow.100">
      <Flex align="center">
        <Heading ml={8} size="md" fontSize="6xl" fontWeight="bold" color="blue.700">
          Collaborate your work!
        </Heading>
      </Flex>
      {Auth.loggedIn() ? (
        <Flex align="center" direction={{ base: "column", md: "row" }}>
          <Link to="/">
            <Text p={5}>Home</Text>
          </Link>
          <Link to="/me">
            <Text p={5}>Dashboard</Text>
          </Link>
          {/* <Link to="/projects">
            <Text p={5}>Projects</Text>
          </Link> */}
          <Link onClick={logout} to="/">
            <Text p={5}>Logout</Text>
          </Link>
        </Flex>
      ) : (
        <Flex align="center" direction={{ base: "column", md: "row" }}>
          <Link to="/">
            <Text p={5}>Home</Text>
          </Link>
          <Link to="/login">
            <Text p={5}>Login</Text>
          </Link>
          <Link to="/signup">
            <Text p={5}>Sign Up</Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
}

export default Header;
