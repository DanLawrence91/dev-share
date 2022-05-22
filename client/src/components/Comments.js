import { Heading, Flex, Text, Box } from "@chakra-ui/react";
import React from "react";

const Comments = ({ comments = [] }) => {
  if (!comments.length) {
    return (
      <Heading fontSize={"xl"} p={3}>
        No comments yet
      </Heading>
    );
  }

  return (
    <>
      <div>
        <Flex direction={"row"} wrap={"wrap"}>
          {comments &&
            comments.map((comment) => (
              <Flex py={2} mx={10} key={comment._id} justifyContent={"center"}>
                <Box bg={"blue.50"} boxShadow={"lg"} rounded={"lg"} p={3} textAlign={"center"}>
                  <Heading fontSize={"md"}>{comment.commentAuthor} commented:</Heading>
                  <Text textAlign={"center"}>{comment.commentText}</Text>
                </Box>
              </Flex>
            ))}
        </Flex>
      </div>
    </>
  );
};

export default Comments;
