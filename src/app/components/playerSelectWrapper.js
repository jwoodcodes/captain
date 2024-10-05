"use client";

import { useState } from 'react';
import PlayerSelect from './playerSelect';

export default function PlayerSelectWrapper({ initialSleeperPlayerData, user, week, captainData }) {
  const [captainDataState, setCaptainDataState] = useState(captainData);

  return (
    <PlayerSelect
      initialSleeperPlayerData={initialSleeperPlayerData}
      user={user}
      week={week}
      captainData={captainDataState}
      setCaptainDataState={setCaptainDataState}
    />
  );
}