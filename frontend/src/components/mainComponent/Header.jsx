import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ClubState } from "../../context/ClubProvider";
import CreateClubModal from "../modals/CreateClubModal";

const Header = () => {
  const navigate = useNavigate();
  const { user, setSelectedClub } = ClubState();

  const profileHandler = () => {
    navigate("/profile");
  };

  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    setSelectedClub(false);
    navigate("/");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Box onClick={() => setSelectedClub(false)} cursor="pointer">
          <Text fontSize={{ base: "xl", md: "2xl" }}>&#127756; SSGI Clubs</Text>
        </Box>
        <Box display="flex" alignItems="center">
          {user.isAdmin && (
            <CreateClubModal>
              <Button mr={5} colorScheme="blue">
                Create New Club
              </Button>
            </CreateClubModal>
          )}
          <Menu>
            <MenuButton>
              <Avatar
                src={user.pic}
                name={user.name}
                size={{ base: "sm", lg: "md" }}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Avatar
                  src={user.pic}
                  name={user.name}
                  size={{ base: "lg", md: "xl" }}
                />
                <Box p={3}>
                  <Text fontSize={{ base: "lg", md: "xl" }}>{user.name}</Text>
                  <Text fontSize={{ base: "lg", md: "xl" }}>{user.email}</Text>
                </Box>
              </MenuItem>
              <MenuItem onClick={profileHandler}>Manage Your Account</MenuItem>
              <MenuItem onClick={signoutHandler}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default Header;
