import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      w="100%"
      m={3}
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      boxShadow="md"
      p={3}
      _hover={{
        bg: "dodgerblue",
        color: "white",
      }}
      cursor="pointer"
      onClick={handleFunction}
    >
      <Avatar src={user.pic} name={user.name} size="md" />
      <Box display="flex" flexDir="column" ml={3}>
        <Text>{user.name}</Text>
        <Text>
          <b>{user.email}</b>
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
