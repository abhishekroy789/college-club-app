import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClubContext = createContext();

const ClubProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [club, setClub] = useState();
  const [myClub, setMyClub] = useState([]);
  const [otherClub, setOtherClub] = useState([]);
  const [selectedClub, setSelectedClub] = useState(false);
  const [posts, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ClubContext.Provider
      value={{
        user,
        setUser,
        club,
        setClub,
        myClub,
        setMyClub,
        otherClub,
        setOtherClub,
        selectedClub,
        setSelectedClub,
        posts,
        setPost,
        comments,
        setComments,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export const ClubState = () => {
  return useContext(ClubContext);
};

export default ClubProvider;
