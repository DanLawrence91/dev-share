import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { Button, FormControl, FormLabel, Heading, Text, Textarea } from "@chakra-ui/react";
import Auth from "../utils/auth";

const CommentForm = ({ projectId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          projectId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <Heading px={5} fontSize={"lg"}>
        What are your thoughts on this project?
      </Heading>

      {Auth.loggedIn() ? (
        <>
          {error && <span>{error.message}</span>}
          <form onSubmit={handleFormSubmit}>
            <FormControl py={2}>
              <FormLabel htmlFor="comment" px={5}>
                Add you comment here:
              </FormLabel>
              <Textarea type={"text"} m={2} w={"3xl"} name="commentText" placeholder="Comments..." value={commentText} onChange={handleChange} />
            </FormControl>
            <Text px={5}>Character Count = {characterCount}/280</Text>
            <Button flex={1} fontSize={"sm"} rounded={"full"} _focus={{ bg: "gray.200" }} type="submit" m={2}>
              Add Comment
            </Button>
          </form>
        </>
      ) : (
        <Text>
          You need to be logged in to share your thoughts. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </Text>
      )}
    </div>
  );
};

export default CommentForm;
