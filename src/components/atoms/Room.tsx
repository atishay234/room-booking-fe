import { useEffect, useState } from "react";
import useHomeStore from "../../store/homeStore";
import "../styles/Room.css";
import axios from "axios";

type RoomProps = {
  roomData: any;
  availabilityStatus: any;
};

const Room: React.FC<RoomProps> = ({ roomData, availabilityStatus }) => {
  const setSelectedRoomData = useHomeStore(
    (state) => state.setSelectedRoomData
  );
  const [imageSrc, setImageSrc] = useState("");

  const selectedRoomData = useHomeStore((state) => state.selectedRoomData);

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/images/${roomData.imageLink}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          responseType: "arraybuffer",
        }
      );
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } else {
        console.error(`Error fetching image: ${response.statusText}`);
      }
    } catch (error) {}
  }

  return (
    <div
      className="room"
      onClick={() => {
        setSelectedRoomData(roomData);
      }}
      style={{
        border:
          roomData._id === selectedRoomData._id
            ? "2px solid darkcyan"
            : "1px solid lightgrey",
      }}
    >
      <div>
        <img src={imageSrc} width={"100px"} height={"100px"}></img>
        <h3 style={{ fontWeight: "normal", width: "fit-content" }}>
          {roomData?.name}
        </h3>
        <div>
          <p style={{ fontSize: "smaller", fontWeight: "normal" }}>
            {availabilityStatus}
          </p>
        </div>
      </div>
      <div className="room-right">
        <div className="room-tag-container">
          {roomData.tagsData?.map((tag: any) => {
            return (
              <div className="room-tag" key={`t${tag._id}-left`}>
                {tag.name}
              </div>
            );
          })}
        </div>

        <div className="room-capacity">
          <p>{roomData.capacity} Seat Capacity</p>
        </div>
      </div>
    </div>
  );
};

export default Room;
