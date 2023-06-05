import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ClubState } from "../../context/ClubProvider";
import UserListItem from "../userAvatar/UserListItem";

const CreateClubModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = ClubState();
  const [name, setName] = useState();
  const [moto, setMoto] = useState();
  const [pic, setPic] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [incharge, setIncharge] = useState();
  const [loading, setLoading] = useState(false);

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

  const searchHandler = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/search?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const submitHandler = async () => {
    if (!name || !incharge) {
      toast({
        title: "Please Fill All The Fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        clubName: name,
        clubIncharge: incharge._id,
        clubMoto: moto,
        clubPic: pic,
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/v1/club/create`,
        value,
        config
      );
      onClose();
      toast({
        title: "Club Created Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Failed To Create Club!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "md" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Club</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="10px">
              <FormControl>
                <FormLabel>Club Name</FormLabel>
                <Input type="text" onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Club Moto</FormLabel>
                <Input type="text" onChange={(e) => setMoto(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" onChange={handleFile} />
              </FormControl>
              {pic && <Image src={pic} />}
              <FormControl>
                <FormLabel>Club Incharge</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => searchHandler(e.target.value)}
                />
              </FormControl>
              {incharge && <span>Incharge : {incharge.name}</span>}
              {loading ? (
                <div>Loading...</div>
              ) : (
                searchResult &&
                searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => setIncharge(user)}
                  />
                ))
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={submitHandler}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateClubModal;
