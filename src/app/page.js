import PlayerSelectWrapper from './components/playerSelectWrapper';

async function getData() {
  // Fetch your initial data here
  // This is just an example, replace with your actual data fetching logic
  const initialSleeperPlayerData = []; // Fetch this data
  const user = {}; // Fetch user data
  const week = 1; // Set the current week
  const captainData = []; // Fetch captain data

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
