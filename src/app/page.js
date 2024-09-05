import Image from "next/image";
import React from "react";
// import GetData from "./data/dataHandler";
import { initialSleeperPlayerData, captainData } from "./data/dataHandler";
import AppContainer from "./components/AppContainer";
import PlayerSelect from "./components/playerSelect";
import UserAuth from "./components/UserAuth";
import oCaptainLeagueDataArray from "./data/oCaptainLeagueDataArray";
export default function Home() {
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
    </main>
  );
}
