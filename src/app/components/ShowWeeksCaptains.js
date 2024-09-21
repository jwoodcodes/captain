import React, { useState, useEffect } from "react";

import axios from "axios";

const CurrentWeekDisplay = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get("/api/users/current-week");
        setUsersData(response.data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    // Fetch data immediately
    fetchUsersData();

    // Set up an interval to fetch data every 30 seconds
    const intervalId = setInterval(fetchUsersData, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  //   console.log(usersData);

  return (
    <div className="current-week-display">
      <h2>Current Week&apos;s Selections</h2>
      {usersData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {usersData.map((user) => (
            <li key={user._id} className="text-white h-fit-content">
              <strong>{user.username}</strong>
              <ul>
                <li>Object: {user.currentWeek.object}</li>
                <li>Player: {user.currentWeek.player}</li>
                <li>Position: {user.currentWeek.position}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentWeekDisplay;
