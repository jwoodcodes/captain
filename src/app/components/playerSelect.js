"use client";
import React, { useState, useEffect } from "react";
import oCaptainLeagueDataArray from "../data/oCaptainLeagueDataArray";
import styles from "../styles/extraStyles.module.css";
import kickoffTimes from "../data/kickoffTimes";

export default function PlayerSelect({
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

  const filteredPlayerData = initialSleeperPlayerData.filter((player) =>
    ["QB", "RB", "WR", "TE"].includes(player.position)
  );

  useEffect(() => {
    console.log(captainData);
    setCaptainDataState(captainData);
  }, []);

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

  const formatCaptainData = () => {
    console.log(captainData);
    return Object.entries(captainData)
      .filter(
        ([key, value]) =>
          key.startsWith("week") && value.player && value.position
      )
      .map(([key, value]) => ({
        weekNumber: parseInt(key.replace("week", "")),
        player: value.player,
        position: value.position,
      }))
      .sort((a, b) => a.weekNumber - b.weekNumber);
  };

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

      {user && captainData && Object.keys(captainData).length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl text-white text-center font-bold mb-4">
            My Captain Selections
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 text-left ">Week</th>
                <th className="p-2 text-left">Player</th>
                <th className="p-2 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {formatCaptainData().map((captain, index) => (
                <tr
                  key={captain.weekNumber}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-2 border-t text-white">
                    Week {captain.weekNumber}
                  </td>
                  <td className="p-2 border-t font-medium text-white">
                    {captain.week1.player}
                  </td>
                  <td className="p-2 border-t">{captain.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
