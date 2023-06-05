import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import Cards from "../utils/Cards";
import { ClubState } from "../../context/ClubProvider";
import axios from "axios";

const ClubBox = ({ user }) => {
  const toast = useToast();

  const { selectedClub } = ClubState();
  const [clubs, setClubs] = useState([]);
  const [other, setOther] = useState([]);

  const fetchClubs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/club/fetchmy/${user._id}`,
        config
      );

      setClubs(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the clubs",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  const fetchOtherClubs = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/club/fetchother/${user._id}`,
        config
      );

      setOther(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the clubs",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchOtherClubs();
  }, []);

  return (
    <Box p={5} display={selectedClub ? "none" : ""}>
      <Text fontSize={{ base: "xl", lg: "2xl" }} mb={3}>
        My Clubs
      </Text>
      {clubs ? (
        <SimpleGrid columns={{ base: "1", md: "2", lg: "4" }} spacing="10px">
          {clubs.map((club) => {
            return <Cards key={club._id} club={club} />;
          })}
        </SimpleGrid>
      ) : (
        {}
      )}
      <Text fontSize={{ base: "xl", lg: "2xl" }} my={5}>
        All Clubs
      </Text>
      {other ? (
        <SimpleGrid columns={{ base: "1", md: "2", lg: "4" }} spacing="10px">
          {other.map((club) => {
            return <Cards key={club._id} club={club} />;
          })}
        </SimpleGrid>
      ) : (
        {}
      )}
    </Box>
  );
};

export default ClubBox;
