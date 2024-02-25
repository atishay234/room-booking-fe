import { useEffect, useState } from "react";
import axios from "axios";
import Room from "../atoms/Room";
import "./css/RoomList.css";
import useHomeStore from "../homeStore";
const RoomList: React.FC = () => {
  const roomsData = useHomeStore((state) => state.roomsData);
  const setRoomsData = useHomeStore((state) => state.setRoomData);
  const setSelectedRoomData = useHomeStore(
    (state) => state.setSelectedRoomData
  );

  useEffect(() => {
    fetchRoomsData();
  }, []);

  const fetchRoomsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setRoomsData(response.data);
      setSelectedRoomData(response.data[0]);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div className="room-list">
      {roomsData.map((room: any, index: any) => {
        return <Room key={room._id} roomData={room}></Room>;
      })}
    </div>
  );
};

export default RoomList;
