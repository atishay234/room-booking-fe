import useHomeStore from "../../store/homeStore";

type SessionProps = {
  session: any;
  sameUserBooked: boolean;
  anotherUserBooked: boolean;
};

const Session: React.FC<SessionProps> = ({
  session,
  sameUserBooked,
  anotherUserBooked,
}) => {
  const selectedSession = useHomeStore((state) => state.selectedSession);

  const setSelectedSession = useHomeStore((state) => state.setSelectedSession);

  return (
    <div
      key={`${session.startTime}`}
      className="session-box"
      onClick={() => {
        setSelectedSession(session._id);
      }}
      style={{
        border:
          selectedSession === session._id
            ? "2px solid darkgreen"
            : "1px solid lightgrey",
        backgroundColor: sameUserBooked
          ? "lightgreen"
          : anotherUserBooked
          ? "rgba(208, 0, 0,0.5)"
          : "transparent",
      }}
    >
      <span style={{ marginRight: "5px" }}>
        {" "}
        {session.startTime.split(" ")[0]}
      </span>
      -
      <span style={{ marginLeft: "5px" }}>
        {" "}
        {session.endTime.split(" ")[0]}
      </span>
    </div>
  );
};

export default Session;
