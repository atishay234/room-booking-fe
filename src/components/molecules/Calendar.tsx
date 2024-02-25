// src/components/Calendar.js
import React, { useEffect, useMemo, useState } from "react";
import "./css/Calendar.css";
import useHomeStore from "../homeStore";
import axios from "axios";
const Calendar = () => {
  const [avail, setAvail] = useState<any[]>([]);
  const sessions = useHomeStore((state) => state.sessions);
  const setSessions = useHomeStore((state) => state.setSessions);
  const selectedRoomData = useHomeStore((state) => state.selectedRoomData);
  const selectedDate = useHomeStore((state) => state.selectedDate);
  const setSelectedDate = useHomeStore((state) => state.setSelectedDate);
  const selectedSession = useHomeStore((state) => state.selectedSession);
  const setSelectedSession = useHomeStore((state) => state.setSelectedSession);
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
    if (selectedRoomData._id) fetchAvailability();
  }, []);

  useEffect(() => {
    if (selectedRoomData._id) {
      fetchAvailability();
    }
  }, [selectedRoomData._id, selectedDate]);

  async function fetchSessions() {
    try {
      const response = await axios.get("http://localhost:3001/api/sessions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }

  async function fetchAvailability() {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/booking-details?roomId=${selectedRoomData._id}&date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setAvail(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  }
  async function bookRoom() {
    if (selectedSession === "") {
      alert("Please select a session");
      return;
    }
    const response = await fetch(
      "http://localhost:3001/api/booking-details/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          roomId: selectedRoomData._id,
          date: selectedDate,
          session: selectedSession,
        }),
      }
    );
    if (response.ok) {
      alert("Room booked successfully");
    }

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
      calendar.push(
        <div
          key={day}
          className="calendar-day"
          style={{
            border:
              day == selectedDate.split("-")[2]
                ? "2px solid darkgreen"
                : "1px solid lightgrey",
          }}
          onClick={() => {
            setSelectedDate(
              `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`
            );
          }}
        >
          {day}
        </div>
      );
    }
    return calendar;
  };

  return (
    <div className="calendar-container">
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
            {selectedRoomData.tagsData?.map((tag: any) => {
              return <div className="tag">{tag.name}</div>;
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
              {selectedRoomData.capacity} Seat Capacity
            </p>
          </div>
        </div>
      </div>

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
        <div style={{ marginRight: "1rem", marginTop: "1rem" }}>
          <button className="book-button" onClick={bookRoom}>
            Book
          </button>
        </div>
      </div>
      <div className="session-container">
        <div className="session-boxes">
          {sessions.map((session: any) => {
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
                  backgroundColor: avail.find(
                    (item: any) =>
                      item.user === currentUser._id &&
                      item.session === session._id
                  )
                    ? "green"
                    : avail.find((item: any) => item.session === session._id)
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
