import { useEffect, useState } from "react";
import "../styles/Calendar.css";
import useHomeStore from "../../store/homeStore";
import axios from "axios";
import Session from "../atoms/Session";
import CalendarRoomInfo from "../atoms/CaledarRoomInfo";
import CalendarDay from "../atoms/CaledarDay";
import endpoints from "../../utils/endpoints";
import messages from "../../utils/messages";

const Calendar = () => {
  const [avail, setAvail] = useState<any[]>([]);
  const sessions = useHomeStore((state) => state.sessions);
  const setSessions = useHomeStore((state) => state.setSessions);
  const selectedRoomData = useHomeStore((state) => state.selectedRoomData);
  const selectedDate = useHomeStore((state) => state.selectedDate);
  const setSelectedDate = useHomeStore((state) => state.setSelectedDate);
  const selectedSession = useHomeStore((state) => state.selectedSession);
  const setSelectedSession = useHomeStore((state) => state.setSelectedSession);
  const setBookRoomCalledSwitch = useHomeStore(
    (state) => state.setBookRoomCalledSwitch
  );
  const bookRoomCalledSwitch = useHomeStore(
    (state) => state.bookRoomCalledSwitch
  );
  const currentDate = new Date();
  const currentUser = JSON.parse(localStorage.getItem("user") ?? "{}");

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  useEffect(() => {
    fetchSessions();
    setSelectedDate(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${currentDate.getDate()}`
    );
    if (selectedRoomData?._id) fetchAvailability();
  }, []);

  useEffect(() => {
    if (selectedRoomData?._id) {
      fetchAvailability();
    }
  }, [selectedDate, selectedRoomData]);

  async function fetchSessions() {
    try {
      const response = await axios.get(endpoints.getSessions, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  }

  async function fetchAvailability() {
    try {
      const response = await axios.get(
        endpoints.fetchAvailability(selectedRoomData._id, selectedDate),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setAvail(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  }
  async function bookRoom() {
    if (selectedSession === "") {
      alert(messages.selectASession);
      return;
    }
    const response = await axios.post(
      endpoints.bookRom,
      {
        roomId: selectedRoomData?._id,
        date: selectedDate,
        session: selectedSession,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    alert(messages.roomBooked);
    fetchAvailability();
    setBookRoomCalledSwitch(!bookRoomCalledSwitch);

    setSelectedSession("");
  }

  const renderCalendar = () => {
    const calendar = [];
    for (let i = 0; i < firstDayIndex; i++) {
      calendar.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(<CalendarDay day={day}></CalendarDay>);
    }
    return calendar;
  };

  if (!selectedRoomData?._id) {
    return <></>;
  }

  return (
    <div className="calendar-container">
      <CalendarRoomInfo></CalendarRoomInfo>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="calendar-grid">
          <div className="calendar-header">Sun</div>
          <div className="calendar-header">Mon</div>
          <div className="calendar-header">Tue</div>
          <div className="calendar-header">Wed</div>
          <div className="calendar-header">Thu</div>
          <div className="calendar-header">Fri</div>
          <div className="calendar-header">Sat</div>
          {renderCalendar()}
        </div>
        <div className="book-button">
          <button
            className="book-button"
            onClick={bookRoom}
            disabled={
              avail.find((item: any) => item.session === selectedSession)
                ? true
                : false
            }
          >
            Book
          </button>
        </div>
      </div>
      <div className="session-container">
        <div className="session-boxes">
          {sessions.map((session: any) => {
            return (
              <Session
                session={session}
                sameUserBooked={avail.find(
                  (item: any) =>
                    item.user === currentUser._id &&
                    item.session === session._id
                )}
                anotherUserBooked={avail.find(
                  (item: any) => item.session === session._id
                )}
              ></Session>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
