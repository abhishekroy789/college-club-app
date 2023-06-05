import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ClubState } from "../context/ClubProvider";
import axios from "axios";

const ProfilePage = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState();
  const { user } = ClubState();

  const submitHandler = () => {
    navigate("/main");
  };

  const handleFile = async (event) => {
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
  };

  return (
    <>
      {user && (
        <Box
          bgGradient="linear(to-r, cyan, dodgerblue)"
          h="100vh"
          overflowY="scroll"
        >
          <Container maxW="xl" centerContent mb="15px">
            <Box
              display="flex"
              justifyContent="center"
              p={3}
              bg="white"
              w="100%"
              m="40px 0 15px 0"
              borderRadius="lg"
              borderWidth="1px"
            >
              <Text fontSize="4xl">&#127756; SSGI Clubs</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
              <VStack spacing="10px">
                <Avatar src={pic} size="2xl" cursor="pointer" />
                <FormControl>
                  <FormLabel>Upload Image</FormLabel>
                  <Input type="file" onChange={handleFile} />
                </FormControl>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={user.name}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={user.email}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Confirm</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  w="100%"
                  onClick={submitHandler}
                  isLoading={loading}
                >
                  Update Info
                </Button>
              </VStack>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ProfilePage;
