import { useEffect, useState } from "react";
import axios from "axios";
import Room from "../atoms/Room";
import "../styles/RoomList.css";
import useHomeStore from "../../store/homeStore";
import endpoints from "../../utils/endpoints";
const RoomList: React.FC = () => {
  const roomsData = useHomeStore((state) => state.roomsData);
  const [nextAvaialableSlots, setNextAvailableSlots] = useState<any>({});
  const bookRoomCalledSwitch = useHomeStore(
    (state) => state.bookRoomCalledSwitch
  );

  useEffect(() => {
    fetchNextAvailableSlots();
  }, []);

  useEffect(() => {
    fetchNextAvailableSlots();
  }, [bookRoomCalledSwitch]);

  async function fetchNextAvailableSlots() {
    try {
      const response = await axios.get(endpoints.getClosestAvailableSlots, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setNextAvailableSlots(response.data);
    } catch (error) {
      console.error("Error fetching next available slots:", error);
    }
  }

  if (roomsData.length === 0) {
    return <></>;
  }

  return (
    <div className="room-list">
      {roomsData.map((room: any, index: any) => {
        return (
          <Room
            key={room._id}
            roomData={room}
            availabilityStatus={nextAvaialableSlots[room._id]}
          ></Room>
        );
      })}
    </div>
  );
};

export default RoomList;
