import { useEffect, useState } from "react";
import RoomList from "./molecules/RoomList";
import axios from "axios";
import Calendar from "./molecules/Calendar";

const HomePage = () => {
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      fetchAccessToken();
    }
  }, []);
  const fetchAccessToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/");

      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify(response.data.user));

      localStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        padding: "1rem",
      }}
    >
      <RoomList></RoomList>
      <Calendar></Calendar>
    </div>
  );
};

export default HomePage;
