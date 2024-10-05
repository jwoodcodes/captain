"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import oCaptainLeagueDataArray from "../data/oCaptainLeagueDataArray";
import styles from "../styles/extraStyles.module.css";
import kickoffTimes from "../data/kickoffTimes";

const PlayerSelect = memo(function PlayerSelect({
  initialSleeperPlayerData,
  user,
  week,
  captainData,
  setCaptainDataState,
}) {
  const [teamOneSearchValue, setTeamOneSearchValue] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [latestCaptainData, setLatestCaptainData] = useState([]);
  const [tableKey, setTableKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const filteredPlayerData = initialSleeperPlayerData.filter((player) =>
    ["QB", "RB", "WR", "TE"].includes(player.position)
  );

  const fetchLatestCaptainData = useCallback(async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/users/currentWeek?t=${timestamp}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Fetched data:", responseData);
      setLatestCaptainData(responseData.data); // Make sure we're setting the data array, not the whole response
      setCaptainDataState(responseData.data);
      setTableKey(prevKey => prevKey + 1); // Force re-render
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    }
  }, [setCaptainDataState]);

  useEffect(() => {
    fetchLatestCaptainData();
  }, [fetchLatestCaptainData]);

  function teamOneSearchOnChange(event) {
    setTeamOneSearchValue(event.target.value);
    setShowDropdown(true);
  }

  function onPlayerSelectFromList(searchTerm, player, user) {
    setTeamOneSearchValue(searchTerm);
    setShowDropdown(false);

    const userObject = oCaptainLeagueDataArray.find(
      (obj) => obj.username === user
    );

    if (userObject) {
      userObject[`week${week}`] = searchTerm;
    }
  }

  async function onSearch(searchTerm, user) {
    console.log("Search term:", searchTerm);
    console.log("User:", user);

    // Check if the user is logged in
    if (!user || !user.username) {
      console.error("User not logged in");
      setPopoverMessage("Please log in to set a captain");
      setShowPopover(true);
      setTimeout(() => setShowPopover(false), 3000);
      setTeamOneSearchValue("");
      setShowDropdown(false);
      return; // Exit the function early
    }

    const player = filteredPlayerData.find(
      (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );

    console.log("Found player:", player);

    if (player) {
      function compareDateAndTime(targetDate, targetTime) {
        // Combine the target date and time
        const [month, day, year] = targetDate.split("-");
        const targetDateTime = new Date(
          `${year}-${month}-${day}T${targetTime}:00`
        );

        // Get the current date and time
        const currentDateTime = new Date();

        // Compare the two dates
        if (currentDateTime < targetDateTime) {
          return "before";
        } else {
          return "after";
        }
      }

      let tryingToSetCaptainBeforeOrAfterKickoff = "before";

      kickoffTimes.forEach((kickoffTime) => {
        if (kickoffTime.team === player.team) {
          let res = compareDateAndTime(kickoffTime.date, kickoffTime.kick);
          console.log(res);
          if (res === "after") {
            tryingToSetCaptainBeforeOrAfterKickoff = "after";
          }
        }
      });

      if (tryingToSetCaptainBeforeOrAfterKickoff === "before") {
        try {
          console.log("Sending request to /api/updateCaptain");
          const response = await fetch("/api/updateCaptain", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.username,
              week: week,
              captainName: player.name,
              position: player.position,
            }),
          });

          console.log("Response status:", response.status);

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update captain: ${errorText}`);
          }

          const data = await response.json();
          console.log("Response data:", data);

          setCaptainDataState(data.updatedUser);

          // After successful update, fetch the latest data
          await fetchLatestCaptainData();

          setPopoverMessage(`Captain for week ${week} set to ${player.name}`);
          setShowPopover(true);
          setTimeout(() => setShowPopover(false), 3000);
        } catch (error) {
          console.error("Error updating captain:", error);
          setPopoverMessage(`Failed to update captain: ${error.message}`);
          setShowPopover(true);
          setTimeout(() => setShowPopover(false), 3000);
        }
      } else {
        setPopoverMessage(
          "Cannot set as captain, player's game has already begun"
        );
        setShowPopover(true);
        setTimeout(() => setShowPopover(false), 3000);
      }

      setTeamOneSearchValue("");
      setShowDropdown(false);
    } else {
      console.error("Player not found");
      setPopoverMessage("Failed to update captain: Player not found");
      setShowPopover(true);
      setTimeout(() => setShowPopover(false), 3000);
    }
  }

  const handleUpdateTable = async () => {
    console.log("Update button clicked");
    setIsUpdating(true);
    try {
      await fetchLatestCaptainData();
      console.log("Table data updated successfully");
    } catch (error) {
      console.error("Error updating table:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  console.log('Rendering PlayerSelect component');
  console.log('user:', user);
  console.log('latestCaptainData:', latestCaptainData);
  console.log('error:', error);

  return (
    <div>
      <div>
        <input
          type="text"
          value={teamOneSearchValue}
          onChange={teamOneSearchOnChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSearch(teamOneSearchValue, user);
            }
          }}
          placeholder="Search for a player"
          className="mr-4 text-center p-2 rounded"
        />
        <button
          onClick={() => onSearch(teamOneSearchValue, user)}
          className="text-white border border-white rounded p-2 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 transition-colors duration-300"
        >
          Set Captain
        </button>
      </div>
      {showDropdown && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(teamOneSearchValue, user);
          }}
        >
          {filteredPlayerData
            .filter((player) => {
              if (player.name) {
                const searchTerm = teamOneSearchValue.toLowerCase();
                const name = player.name.toLowerCase();
                let tempLast = name.split(/\s/);
                let lastName = tempLast[1];
                const searchLength = searchTerm.length > 0 ? true : false;

                if (searchLength === true && name !== searchTerm) {
                  return (
                    name.startsWith(searchTerm) ||
                    lastName.startsWith(searchTerm)
                  );
                }
              }
            })
            .slice(0, 15)
            .map(function (player) {
              return (
                <div
                  onClick={() =>
                    onPlayerSelectFromList(player.name, player, user)
                  }
                  key={player.name}
                  className="text-white cursor-pointer"
                >
                  {player.name}
                </div>
              );
            })}
        </form>
      )}
      {showPopover && <div className={styles.popover}>{popoverMessage}</div>}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <h2 className="text-xl text-white text-center font-bold mb-4">
        Week {week} captain selections
      </h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleUpdateTable}
          disabled={isUpdating}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isUpdating ? 'Updating...' : 'Update Table'}
        </button>
      </div>
      
      {error && <p className="error text-red-500">{error}</p>}
      
      {!error && latestCaptainData && latestCaptainData.length > 0 ? (
        <div key={tableKey} className="mt-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left">Manager</th>
                <th className="p-2 text-left">Player</th>
                <th className="p-2 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {latestCaptainData.map((data) => {
                let weekToUse = data[`week${week}`];
                return (
                  <tr key={data.username} className="text-white">
                    <td>{data.username}</td>
                    <td>{weekToUse?.player || "Not set"}</td>
                    <td>{weekToUse?.position || "Not set"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-white">No data available to display.</p>
      )}
    </div>
  );
});

export default PlayerSelect;