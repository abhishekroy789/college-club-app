import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ClubState } from "../../context/ClubProvider";
import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";

const CommentModal = ({ children, post }) => {
  const { user, comments, setComments } = ClubState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState();
  const toast = useToast();

  const fetchComment = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/comment/fetch/${post._id}`,
        config
      );
      setComments(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Comments",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    onOpen();
  };

  const createComment = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        post: post._id,
        content: content,
        userId: user._id,
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/comment/create`,
        value,
        config
      );
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Comments",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    onClose();
  };

  return (
    <>
      <span onClick={fetchComment}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="400px">
              <ScrollableFeed>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <Box m={2} key={comment._id}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={comment.sender.pic}
                            name={comment.sender.name}
                            size="xs"
                          />
                          <Heading size="sm" ml={2}>
                            {comment.sender.name}
                          </Heading>
                        </Box>
                        <Text>{comment.content}</Text>
                        <Divider colorScheme="black" />
                      </Box>
                    );
                  })}
              </ScrollableFeed>
            </Box>

            <Box display="flex" m={1}>
              <Input type="text" onChange={(e) => setContent(e.target.value)} />
              <Button colorScheme="blue" ml={1} onClick={createComment}>
                Send
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentModal;
