import { create } from "zustand";

export interface IHome {
  roomsData: any[];
  sessions: any[];
  selectedRoomData: any;
  selectedDate: any;
  selectedSession: any;
  bookRoomCalledSwitch: boolean;
  setSessions: (sessions: any) => void;
  setSelectedDate: (selectedDate: any) => void;
  setSelectedSession: (selectedSession: any) => void;
  setRoomData: (roomData: any) => void;
  setBookRoomCalledSwitch: (newValue: boolean) => void;
  setSelectedRoomData: (roomData: any) => void;
}

const useHomeStore = create<IHome>((set, get) => ({
  roomsData: [],
  sessions: [],
  selectedRoomData: "",
  selectedDate: `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, "0")}-${new Date().getDate()}`,
  selectedSession: "",
  bookRoomCalledSwitch: false,
  setBookRoomCalledSwitch(newValue: boolean) {
    set({ bookRoomCalledSwitch: newValue });
  },
  setSessions: (sessions) => {
    set({ sessions });
  },
  setSelectedDate: (selectedDate) => {
    set({ selectedDate });
  },
  setSelectedSession: (selectedSession) => {
    set({ selectedSession });
  },

  setRoomData: (roomsData) => {
    set({ roomsData });
  },

  setSelectedRoomData: (roomId) => {
    set({ selectedRoomData: roomId });
  },
}));

export default useHomeStore;
