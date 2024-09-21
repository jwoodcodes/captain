import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://devJay:Hesstrucksarethebest@dailydynasties.syom4sb.mongodb.net/test";

async function fetchCaptainDataFromMongodb() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("dailydynasties");
    const col = db.collection("captain2024");

    const captainDocs = await col.find({}).toArray();

    return captainDocs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (err) {
    console.error("Error fetching captain data:", err);
    return [];
  } finally {
    await client.close();
  }
}

export async function GET(request) {
  try {
    const captainData = await fetchCaptainDataFromMongodb();
    return NextResponse.json(captainData);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
