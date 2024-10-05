import PlayerSelectWrapper from './components/playerSelectWrapper';

async function getData() {
  // Fetch your initial data here
  // ...
  return {
    initialSleeperPlayerData,
    user,
    week,
    captainData,
  };
}

export default async function Home() {
  const data = await getData();

  return <PlayerSelectWrapper {...data} />;
}
