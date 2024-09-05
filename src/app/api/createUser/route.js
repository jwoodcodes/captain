import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

console.log("Environment variables:", process.env);
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const url = process.env.MONGODB_URI;
if (!url) {
  console.error("MONGODB_URI is not defined in the environment variables");
  throw new Error("MONGODB_URI is not defined");
}

const dbName = "dailydynasties";

export async function POST(request) {
  console.log("Received request to create user");
  console.log("MongoDB URI:", url); // Log the URI for debugging
  const client = new MongoClient(url);

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { username, password } = body;

    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const col = db.collection("captain2024");

    const newUser = { username, password };
    const result = await col.insertOne(newUser);

    console.log("User created with ID:", result.insertedId);

    return NextResponse.json(
      { message: "User created successfully", userId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in createUser API:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
