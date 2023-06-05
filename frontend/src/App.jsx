import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage, MainPage, ProfilePage } from "./pages/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
