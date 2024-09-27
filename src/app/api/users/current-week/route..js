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
    console.log(`Fetched ${captainDocs.length} documents from MongoDB`);

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
    console.log("Received GET request for captain data");
    const captainData = await fetchCaptainDataFromMongodb();
    const response = NextResponse.json({
      timestamp: new Date().toISOString(),
      data: captainData
    });
    
    // Set cache control headers
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    
    console.log(`Returning ${captainData.length} captain data entries`);
    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
