import React from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ClubState } from "../../context/ClubProvider";
import axios from "axios";

const Cards = ({ club }) => {
  const { setSelectedClub, setClub, setPost, user } = ClubState();
  const toast = useToast();

  const handleClick = async () => {
    setSelectedClub(true);
    setClub(club);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const value = {
        clubId: club._id,
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/post/fetch",
        value,
        config
      );
      setPost(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Post",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  return (
    <Card maxW="sm" cursor="pointer" boxShadow="lg" onClick={handleClick}>
      <CardBody>
        <Stack spacing="10px">
          <Image src={club.clubPic} alt={club.clubName} />
          <Heading size="md">{club.clubName}</Heading>
          <Text>{club.clubMoto}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Cards;
