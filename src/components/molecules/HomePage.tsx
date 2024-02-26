import { useEffect } from "react";
import RoomList from "./RoomList";
import axios from "axios";
import Calendar from "./Calendar";
import Search from "./search";
import useHomeStore from "../../store/homeStore";
import "../styles/HomePage.css";
import messages from "../../utils/messages";
import endpoints from "../../utils/endpoints";

const HomePage = () => {
  const roomsData = useHomeStore((state) => state.roomsData);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      fetchAccessToken();
    }
  }, []);
  const fetchAccessToken = async () => {
    try {
      const response = await axios.get(endpoints.fetchAccessToken);
      const token = response.data.token;
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  return (
    <div className="home-container">
      <Search></Search>
      {roomsData.length !== 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            marginTop: "3rem",
          }}
        >
          <RoomList></RoomList>
          <Calendar></Calendar>
        </div>
      ) : (
        <div>
          <h1>{messages.noRoomsFound}</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
