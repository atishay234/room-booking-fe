import useHomeStore from "../../store/homeStore";

type CalendarRowProps = {
  day: number;
};

const CalendarDay: React.FC<CalendarRowProps> = ({ day }) => {
  const selectedDate = useHomeStore((state) => state.selectedDate);
  const setSelectedDate = useHomeStore((state) => state.setSelectedDate);
  const currentDate = new Date();

  function handleDayClick() {
    setSelectedDate(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    );
  }

  return (
    <div
      key={day}
      className="calendar-day"
      style={{
        border:
          day == selectedDate.split("-")[2]
            ? "2px solid darkgreen"
            : "1px solid lightgrey",
        boxSizing: "border-box",
      }}
      onClick={handleDayClick}
    >
      {day}
    </div>
  );
};

export default CalendarDay;
