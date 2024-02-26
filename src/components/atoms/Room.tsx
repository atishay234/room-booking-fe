import useHomeStore from "../../store/homeStore";
import "../styles/Room.css";

type RoomProps = {
  roomData: any;
  availabilityStatus: any;
};

const Room: React.FC<RoomProps> = ({ roomData, availabilityStatus }) => {
  const setSelectedRoomData = useHomeStore(
    (state) => state.setSelectedRoomData
  );

  const selectedRoomData = useHomeStore((state) => state.selectedRoomData);

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
