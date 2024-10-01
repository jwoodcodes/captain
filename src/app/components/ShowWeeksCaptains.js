import React, { useState, useEffect } from "react";

import axios from "axios";

const ShowWeeksCaptains = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        console.log("Fetching users data...");
        const response = await axios.get("/api/users/currentWeek"); // Updated URL
        console.log("Users data fetched:", response.data);
        setUsersData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users data:", error);
        setError("Failed to fetch users data. Please try again later.");
      }
    };

    fetchUsersData();
  }, []);

  // Rest of your component code...
};

export default ShowWeeksCaptains;
