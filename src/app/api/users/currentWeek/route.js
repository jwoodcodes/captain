import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URI;

export async function GET() {
  console.log("GET request received for /api/users/currentWeek");
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("dailydynasties");
    const col = db.collection("captain2024");

    const captainDocs = await col.find({}).toArray();
    console.log(`Fetched ${captainDocs.length} documents`);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      data: captainDocs
    }, { 
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (err) {
    console.error("Error fetching captain data:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  } finally {
    await client.close();
  }
}

