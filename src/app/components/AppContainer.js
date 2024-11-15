"use client";
import React, { useState } from "react";
import UserAuth from "./UserAuth";
import PlayerSelect from "./playerSelect";
import CurrentWeekDisplay from "./ShowWeeksCaptains";

export default function AppContainer({
  initialSleeperPlayerData,
  captainData,
}) {
  const [user, setUser] = useState(null);
  const [week, setWeek] = useState(11);
  const [captainDataState, setCaptainDataState] = useState(captainData);

  return (
    <div>
      <h2 className="text-white text-2xl mb-4 text-center">Week {week}</h2>
      <UserAuth
        user={user}
        setUser={setUser}
        captainData={captainDataState}
        setCaptainDataState={setCaptainDataState}
      />
      {user && (
        <PlayerSelect
          user={user}
          initialSleeperPlayerData={initialSleeperPlayerData}
          captainData={captainDataState}
          setCaptainDataState={setCaptainDataState}
          week={week}
        />
      )}
      <CurrentWeekDisplay />
    </div>
  );
}
