import { FormControl, FormLabel, Textarea, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../utils/mutations";

function UpdateModal({ projectId, description, contributors }) {
  const [formState, setFormState] = useState({ description: description, contributors: contributors });
  const [updateProject, { error }] = useMutation(UPDATE_PROJECT);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      const { data } = await updateProject({
        variables: {
          projectId,
          ...formState,
        },
      });

      setFormState({
        description: description,
        contributors: contributors,
      });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }

    setFormState({
      description: "",
      contributors: "",
    });
  };
  return (
    <>
      <Button onClick={onOpen}>Update Project</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your Project</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleFormSubmit}>
            <ModalBody>
              <FormControl p={3}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea type="text" placeholder="Update description here" name="description" value={formState.description} onChange={handleChange} />
              </FormControl>
              <FormControl p={3}>
                <FormLabel htmlFor="contributors">Contributors</FormLabel>
                <Input placeholder="Update the contributors here" name="contributors" type="text" value={formState.contributors} onChange={handleChange} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button borderRadius={0} type="submit" variant="solid" colorScheme="blue">
                Update
              </Button>
            </ModalFooter>
          </form>
          {error && <div>{error.message}</div>}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateModal;
