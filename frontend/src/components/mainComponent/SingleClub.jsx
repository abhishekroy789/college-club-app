import React, { useEffect, useState } from "react";
import { ClubState } from "../../context/ClubProvider";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { isClubIncharge } from "../../clubLogics/ClubLogic";
import axios from "axios";
import { BiChat, BiLike } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentModal from "../modals/CommentModal";

const SingleClub = () => {
  const { selectedClub, club, user, setClub, setPost, posts } = ClubState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [line, setLine] = useState(false);
  const [pic, setPic] = useState();
  const handleClick = () => {
    setLine(!line);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState();

  const addHandler = async (memberId) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        clubId: club._id,
        userId: memberId,
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/v1/club/add",
        value,
        config
      );
      setClub(data);

      toast({
        title: "Member Added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed To Add Member",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const removeHandler = async (memberId) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        clubId: club._id,
        userId: memberId,
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/v1/club/remove",
        value,
        config
      );
      setClub(data);
      toast({
        title: "Member Removed",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed To Remove Member",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const requestHandler = async (memberId) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        clubId: club._id,
        userId: memberId,
      };

      const { data } = await axios.put(
        "http://localhost:5000/api/v1/club/send",
        value,
        config
      );
      setClub(data);

      toast({
        title: "Request Send",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed To Send Request",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const createPost = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        club: club._id,
        description: description,
        photo: pic,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/post/create",
        value,
        config
      );
      onClose();
      toast({
        title: "Post Created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed To Create Post",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    setLoading(false);
  };

  const handleFile = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOADPRESET);
    await axios
      .post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDNAME
        }/image/upload`,
        formData
      )
      .then((res) => setPic(res.data.secure_url))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  return (
    <>
      <Box display={selectedClub ? "" : "none"}>
        <Container bg="" maxW="2xl" centerContent p={3}>
          <Tabs isFitted w="100%">
            <TabList>
              <Tab>Posts</Tab>
              <Tab>Members</Tab>
              <Tab>Club Info</Tab>
              {club && (
                <Tab
                  display={
                    isClubIncharge(user, club.clubIncharge) ? "" : "none"
                  }
                >
                  Requests
                </Tab>
              )}
            </TabList>

            <TabPanels>
              <TabPanel>
                {club && isClubIncharge(user, club.clubIncharge) && (
                  <Button
                    width="100%"
                    mb={3}
                    colorScheme="blue"
                    onClick={onOpen}
                  >
                    Create Post
                  </Button>
                )}

                {posts &&
                  posts.map((post) => {
                    return (
                      <Card mb={4} key={post._id}>
                        <CardHeader p={2}>
                          <Flex>
                            <Flex
                              flex="1"
                              gap="4"
                              alignItems="center"
                              flexWrap="wrap"
                            >
                              <Avatar
                                src={club.clubIncharge.pic}
                                name={club.clubIncharge.name}
                              />
                              <Box>
                                <Heading size="sm">
                                  {club.clubIncharge.name}
                                </Heading>
                                <Text>Incharge, {club.clubName}</Text>
                              </Box>
                            </Flex>
                            <Menu>
                              <MenuButton
                                as={IconButton}
                                icon={<BsThreeDotsVertical />}
                                bg="white"
                              />
                              <MenuList>
                                <MenuItem>Delete</MenuItem>
                              </MenuList>
                            </Menu>
                          </Flex>
                        </CardHeader>

                        <CardBody p={2}>
                          <Text
                            noOfLines={line ? "" : "2"}
                            onClick={handleClick}
                          >
                            {post.description}
                          </Text>
                        </CardBody>
                        <Image
                          objectFit="cover"
                          src={post.photo}
                          alt="Not Available"
                        />

                        <CardFooter
                          justify="space-between"
                          flexWrap="wrap"
                          p={2}
                          sx={{
                            "& > button": {
                              minW: "136px",
                            },
                          }}
                        >
                          <Button
                            flex="1"
                            variant="ghost"
                            leftIcon={<BiLike />}
                          >
                            Like
                          </Button>
                          <Box flex="1">
                            <CommentModal post={post}>
                              <Button
                                w="100%"
                                variant="ghost"
                                leftIcon={<BiChat />}
                              >
                                Comment
                              </Button>
                            </CommentModal>
                          </Box>
                        </CardFooter>
                      </Card>
                    );
                  })}
              </TabPanel>
              <TabPanel>
                <Text p={2} fontSize="xl">
                  Incharge
                </Text>
                <Divider />
                {club && (
                  <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Avatar
                      size="sm"
                      src={club.clubIncharge.pic}
                      name={club.clubIncharge.name}
                    />
                    <Text ml={4}>{club.clubIncharge.name}</Text>
                  </Box>
                )}
                <Text p={2} fontSize="xl">
                  Club Members
                </Text>
                <Divider />
                {club &&
                  club.clubMembers?.map((member) => {
                    return (
                      <Box
                        p={2}
                        key={member._id}
                        display={
                          isClubIncharge(club.clubIncharge, member)
                            ? "none"
                            : "flex"
                        }
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <Avatar
                            size="sm"
                            src={member.pic}
                            name={member.name}
                          />
                          <Text ml={4}>{member.name}</Text>
                        </Box>
                        {isClubIncharge(user, club.clubIncharge) && (
                          <Button
                            colorScheme="red"
                            isLoading={loading}
                            onClick={() => removeHandler(member._id)}
                          >
                            Remove Member
                          </Button>
                        )}
                      </Box>
                    );
                  })}
              </TabPanel>
              <TabPanel>
                {club && (
                  <Box>
                    <Image
                      src={club.clubPic}
                      alt={club.clubName}
                      borderRadius="lg"
                    />
                    <Text fontSize="2xl" p={3}>
                      {club.clubName}
                    </Text>
                    <Text fontSize="lg" p={3}>
                      {club.clubMoto}
                    </Text>
                    <Button
                      w="100%"
                      colorScheme="blue"
                      isLoading={loading}
                      onClick={() => requestHandler(user._id)}
                    >
                      Request To Join
                    </Button>
                    {isClubIncharge(user, club.clubIncharge) && (
                      <Button
                        w="100%"
                        mt={2}
                        colorScheme="green"
                        isLoading={loading}
                        onClick={() => requestHandler(user._id)}
                      >
                        Update Info
                      </Button>
                    )}
                  </Box>
                )}
              </TabPanel>
              <TabPanel>
                <Text p={2} fontSize="xl">
                  Pending Request
                </Text>
                <Divider />
                {club &&
                  club.clubRequest?.map((member) => {
                    return (
                      <Box
                        p={2}
                        key={member._id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                        >
                          <Avatar
                            size="sm"
                            src={member.pic}
                            name={member.name}
                          />
                          <Text ml={4}>{member.name}</Text>
                        </Box>
                        <Button
                          colorScheme="green"
                          isLoading={loading}
                          onClick={() => addHandler(member._id)}
                        >
                          Add Member
                        </Button>
                      </Box>
                    );
                  })}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="10px">
              <FormControl>
                <FormLabel>Post Description</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" onChange={handleFile} />
                {pic && <Image src={pic} alt="loading" />}
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={createPost} isLoading={loading}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingleClub;
