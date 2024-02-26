const endpoints = {
  bookRom: "http://localhost:3001/api/booking-details/book",
  getSessions: "http://localhost:3001/api/sessions",
  fetchAvailability: (roomId: any, date: any) =>
    `http://localhost:3001/api/booking-details?roomId=${roomId}&date=${date}`,
  getClosestAvailableSlots:
    "http://localhost:3001/api/rooms/closest-available-slot",
  fetchRooms: (searchQuery: any) =>
    `http://localhost:3001/api/rooms?query=${searchQuery}`,
  fetchAccessToken:"http://localhost:3001/"  
};

export default endpoints;
