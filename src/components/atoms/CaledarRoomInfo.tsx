import useHomeStore from "../../store/homeStore";

const CalendarRoomInfo = () => {
  const selectedRoomData = useHomeStore((state) => state.selectedRoomData);

  return (
    <div className="calendar-room">
      <h2>{selectedRoomData?.name}</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "space-between",
          marginRight: "1rem",
        }}
      >
        <div className="tag-container">
          {selectedRoomData?.tagsData?.map((tag: any) => {
            return (
              <div className="tag" key={`${tag._id}-right`}>
                {tag.name}
              </div>
            );
          })}
        </div>
        <div style={{ alignSelf: "flex-end", width: "fit-content" }}>
          <p
            style={{
              margin: 0,
              fontSize: "smaller",
              width: "fit-content",
              marginTop: "5px",
            }}
          >
            {selectedRoomData?.capacity} Seat Capacity
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarRoomInfo;
