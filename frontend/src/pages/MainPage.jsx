import React from "react";
import { Divider } from "@chakra-ui/react";
import Header from "../components/mainComponent/Header";
import ClubBox from "../components/mainComponent/ClubBox";
import { ClubState } from "../context/ClubProvider";
import SingleClub from "../components/mainComponent/SingleClub";

const MainPage = () => {
  const { user } = ClubState();

  return (
    <>
      {user && <Header />}
      <Divider />
      {user && <ClubBox user={user} />}
      {user && <SingleClub />}
    </>
  );
};

export default MainPage;
