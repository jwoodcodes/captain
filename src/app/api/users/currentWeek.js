import React from "react";

import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
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

let captainDataForTable = await fetchCaptainDataFromMongodb();

export { captainDataForTable };
