import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/nav.css";
import Auth from "../utils/auth";

const MenuItems = (props) => {
  const { children, to } = props;
  return (
    <Text p={5}>
      <NavLink to={to}>{children}</NavLink>
    </Text>
  );
};

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const getClassName = () => {
    switch (window.location.pathname) {
      case "/":
        return "active";

      case "/dashboard":
        return "active";

      case "/projects":
        return "active";

      case "/login":
        return "active";

      case "/signup":
        return "active";

      default:
        return "inactive";
    }
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
          <MenuItems className={getClassName()} to="/">
            Home
          </MenuItems>
          <MenuItems className={getClassName()} to="/dashboard">
            Dashboard
          </MenuItems>
          <MenuItems className={getClassName()} to="/projects">
            Projects
          </MenuItems>
          <MenuItems onClick={logout}>Logout</MenuItems>
        </Flex>
      ) : (
        <Flex align="center" direction={{ base: "column", md: "row" }}>
          <MenuItems className={getClassName()} to="/">
            Home
          </MenuItems>
          <MenuItems className={getClassName()} to="/dashboard">
            Dashboard
          </MenuItems>
          <MenuItems className={getClassName()} to="/projects">
            Projects
          </MenuItems>
          <MenuItems className={getClassName()} to="/login">
            Login
          </MenuItems>
          <MenuItems className={getClassName()} to="/signup">
            Sign Up
          </MenuItems>
        </Flex>
      )}
    </Flex>
  );
}

export default Header;
