import { create } from "zustand";

export interface IHome {
  roomsData: any[];
  sessions: any[];
  selectedRoomData: any;
  selectedDate: any;
  selectedSession: any;
  setSessions: (sessions: any) => void;
  setSelectedDate: (selectedDate: any) => void;
  setSelectedSession: (selectedSession: any) => void;
  setRoomData: (roomData: any) => void;
  setSelectedRoomData: (roomData: any) => void;
}

const useHomeStore = create<IHome>((set, get) => ({
  roomsData: [],
  sessions: [],
  selectedRoomData: "",
  selectedDate: "",
  selectedSession: "",
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
