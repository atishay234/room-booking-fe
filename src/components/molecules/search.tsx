import { useEffect, useState } from "react";
import useHomeStore from "../../store/homeStore";
import axios from "axios";
import endpoints from "../../utils/endpoints";
import "../styles/Search.css";

const Search: React.FC = () => {
  const setRoomsData = useHomeStore((state) => state.setRoomData);
  const setSelectedRoomData = useHomeStore(
    (state) => state.setSelectedRoomData
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRoomsData();
  }, [searchQuery]);

  const fetchRoomsData = async () => {
    try {
      const response = await axios.get(endpoints.fetchRooms(searchQuery), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setRoomsData(response.data);
      setSelectedRoomData(response.data[0]);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }} className="search-container">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>Search</button>
    </div>
  );
};

export default Search;
