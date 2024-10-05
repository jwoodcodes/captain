import PlayerSelectWrapper from './components/playerSelectWrapper';
<<<<<<< HEAD
import { handleUpdateTable } from './components/ClientPlayerSelect';
async function getData() {
  // Fetch your initial data here
  // This is just an example, replace with your actual data fetching logic
  const initialSleeperPlayerData = []; // Fetch this data
  const user = {}; // Fetch user data
  const week = 1; // Set the current week
  const captainData = []; // Fetch captain data

=======

async function getData() {
  // Fetch your initial data here
  // This is just an example, replace with your actual data fetching logic
  const initialSleeperPlayerData = []; // Fetch this data
  const user = {}; // Fetch user data
  const week = 1; // Set the current week
  const captainData = []; // Fetch captain data

>>>>>>> parent of 1a2b84f (d16)
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
