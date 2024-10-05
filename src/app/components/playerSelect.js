"use client";
import React, { useState, useCallback, useEffect } from "react";
import useSWR from 'swr';
import ClientPlayerSelect from '../components/ClientPlayerSelect';
import handleUpdateTable from '../components/ClientPlayerSelect';
export default function PlayerSelect({ initialSleeperPlayerData, user, week, captainData, setCaptainDataState }) {
  console.log('PlayerSelect rendering, props:', { 
    initialSleeperPlayerDataLength: initialSleeperPlayerData?.length,
    user,
    week,
    captainDataLength: captainData?.length
  });

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

  const latestCaptainData = swrData?.data || [];
  console.log('Rendering with latestCaptainData:', latestCaptainData.length);

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
          onChange={(e) => {
            setTeamOneSearchValue(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search for a player"
          className="w-full p-2 border rounded text-black"
        />
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