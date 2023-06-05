import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import SignIn from "../components/authentication/SignIn";
import SignUp from "../components/authentication/SignUp";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/main");
    }
  }, [navigate]);

  return (
    <Box
      bgGradient="linear(to-r, cyan, dodgerblue)"
      h="100vh"
      overflowY="scroll"
    >
      <Container maxW="xl" centerContent>
        <Box
          textAlign="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
        >
          <Text fontSize="4xl">&#127756; SSGI Clubs</Text>
        </Box>
        <Box bg="white" w="100%" p={3} borderRadius="lg">
          <Tabs isFitted variant="soft-rounded">
            <TabList>
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
