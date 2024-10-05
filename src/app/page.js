import Image from "next/image";
import React, { useState, useEffect } from "react";
// import GetData from "./data/dataHandler";
import { initialSleeperPlayerData, captainData } from "./data/dataHandler";
import AppContainer from "./components/AppContainer";
import PlayerSelect from "./components/playerSelect";
import UserAuth from "./components/UserAuth";
import oCaptainLeagueDataArray from "./data/oCaptainLeagueDataArray";
export default function Home() {
  const [initialSleeperPlayerData, setInitialSleeperPlayerData] = useState([]);

  useEffect(() => {
    async function fetchSleeperData() {
      try {
        const response = await fetch('/api/sleeper-players');
        if (!response.ok) {
          throw new Error('Failed to fetch sleeper player data');
        }
        const data = await response.json();
        setInitialSleeperPlayerData(data);
      } catch (error) {
        console.error('Error fetching sleeper player data:', error);
      }
    }

    fetchSleeperData();
  }, []);

  // console.log(initialSleeperPlayerData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <h1 className="text-sky-400 text-6xl mb-20 ">Captain Tracker 2024</h1>
      {/* <UserAuth />
      <PlayerSelect initialSleeperPlayerData={initialSleeperPlayerData} /> */}
      <AppContainer
        initialSleeperPlayerData={initialSleeperPlayerData}
        captainData={captainData}
      />
      <PlayerSelect
        initialSleeperPlayerData={initialSleeperPlayerData}
        user={user}
        week={week}
        captainData={captainData}
        setCaptainDataState={setCaptainDataState}
      />
    </main>
  );
}

// or wherever PlayerSelect is being used
console.log('Rendering parent component with props:', {
  initialSleeperPlayerDataLength: initialSleeperPlayerData?.length,
  user,
  week,
  captainDataLength: captainData?.length
});

// ... other code ...

// npm --max-old-space-size=8192 run dev
