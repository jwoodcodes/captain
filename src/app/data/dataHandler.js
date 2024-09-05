import React from "react";
// import clientPromise from "../../lib/mongodb";
import { MongoClient } from "mongodb";

async function fetchSleeperDataFromMongodb() {
  const url =
    "mongodb+srv://devJay:Hesstrucksarethebest@dailydynasties.syom4sb.mongodb.net/test";
  const client = new MongoClient(url);

  // The database to use
  const dbName = "dailydynasties";
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "fantasycalcData"
    const col = db.collection("sleeperNamesTeamsAndPositions");

    // Construct a document

    // Insert a single document, wait for promise so we can read it back
    // const p = await col.insertOne(allFantasyCalcData);
    // Find one document
    const mySleperDoc = await col.findOne();

    // console.log(mySleperDoc);
    // playerData = mySleperDoc;

    return mySleperDoc;
    // Print to the console

    ////////////////////////////////////
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

let sleeperData = await fetchSleeperDataFromMongodb();

// if (sleeperData) {
//   setTimeout(() => {
//     console.log(sleeperData);
//   }, 2000);
// }

const initialSleeperPlayerData =
  sleeperData.JustSleeperNamesTeamsAndPostionsArray;
// console.log(sleeperData);
// console.log(initialSleeperPlayerData);
// console.log("ran");
//
//
// const dataArray = data.dynastyRankingsData[0].tradeAnalyzerDataObjectsArray;

//
async function fetchCaptainDataFromMongodb() {
  const url =
    "mongodb+srv://devJay:Hesstrucksarethebest@dailydynasties.syom4sb.mongodb.net/test";
  const client = new MongoClient(url);

  const dbName = "dailydynasties";
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection("captain2024");

    const captainDocs = await col.find({}).toArray();

    // Serialize the documents to remove the ObjectId
    const serializedCaptainDocs = captainDocs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(), // Convert ObjectId to string
    }));

    return serializedCaptainDocs;
  } catch (err) {
    console.log(err.stack);
    return [];
  } finally {
    await client.close();
  }
}

let captainData = await fetchCaptainDataFromMongodb();

export { initialSleeperPlayerData, captainData };
