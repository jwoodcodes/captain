"use client";
import React, { useState, useCallback, useEffect } from "react";
import useSWR from 'swr';

export default function PlayerSelect({ initialSleeperPlayerData, user, week, captainData, setCaptainDataState }) {
  console.log('PlayerSelect rendering, props:', { initialSleeperPlayerData, user, week, captainData });

  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [tableKey, setTableKey] = useState(0);
  const [teamOneSearchValue, setTeamOneSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const fetcher = useCallback(async (url) => {
    console.log('Fetching data from:', url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    const data = await res.json();
    console.log('Fetched data:', data);
    return data;
  }, []);

  const { data: swrData, error: swrError } = useSWR(`/api/users/currentWeek`, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    dedupingInterval: 0,
  });

  useEffect(() => {
    console.log('swrData updated:', swrData);
    if (swrData) {
      setCaptainDataState(swrData.data);
    }
  }, [swrData, setCaptainDataState]);

  const handleUpdateTable = useCallback(async () => {
    setIsUpdating(true);
    try {
      const updatedData = await fetcher(`/api/users/currentWeek?t=${Date.now()}`);
      setCaptainDataState(updatedData.data);
      setTableKey(prev => prev + 1);
      console.log("Table data updated successfully");
    } catch (error) {
      console.error("Error updating table:", error);
      setError("Failed to update table. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  }, [fetcher, setCaptainDataState]);

  const latestCaptainData = swrData?.data || [];
  console.log('Rendering with latestCaptainData:', latestCaptainData);

  const handleSearch = (e) => {
    setTeamOneSearchValue(e.target.value);
    setShowDropdown(true);
  };

  const filteredPlayers = initialSleeperPlayerData ? initialSleeperPlayerData.filter((player) =>
    player.full_name.toLowerCase().includes(teamOneSearchValue.toLowerCase())
  ) : [];

  console.log('Filtered players:', filteredPlayers.length);

  const onSearch = (searchTerm, user) => {
    console.log("Search term:", searchTerm);
    console.log("User:", user);
    // Implement your search logic here
  };

  return (
    <div>
      <h2 className="text-xl text-white text-center font-bold mb-4">
        Week {week} captain selections
      </h2>

      {/* Player select input */}
      <div className="relative mb-4">
        {console.log('Rendering player select input')}
        <input
          type="text"
          value={teamOneSearchValue}
          onChange={handleSearch}
          placeholder="Search for a player"
          className="w-full p-2 border rounded text-black"
        />
        {showDropdown && filteredPlayers.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto">
            {filteredPlayers.map((player) => (
              <li
                key={player.player_id}
                onClick={() => {
                  onSearch(player.full_name, user);
                  setShowDropdown(false);
                  setTeamOneSearchValue("");
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer text-black"
              >
                {player.full_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Update Table button */}
      <div className="flex justify-center mb-4">
        {console.log('Rendering update table button')}
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
}