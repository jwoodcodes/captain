import { MongoClient } from "mongodb";
import { createPostponedAbortSignal } from "next/dist/server/app-render/dynamic-rendering";
import { NextResponse } from "next/server";

const url =
  "mongodb+srv://devJay:Hesstrucksarethebest@dailydynasties.syom4sb.mongodb.net/test";
const dbName = "dailydynasties";

export async function POST(request) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const col = db.collection("captain2024");

    const { username, week, captainName, position } = await request.json();

    const result = await col.updateOne(
      { username: username },
      {
        $set: {
          [`week${week}.player`]: captainName,
          [`week${week}.position`]: position,
        },
      },
      { [`week${week}Captain`]: captainName },
      { [`week${week}Position`]: position },
      { upsert: true }
    );

    // Log the result to see what was actually updated
    console.log("Update result:", result);

    return NextResponse.json(
      { message: "Captain updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating captain:", error);
    return NextResponse.json(
      { message: "Error updating captain", error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
