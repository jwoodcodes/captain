"use client";
import React, { useState, useEffect } from "react";

export default function UserAuth({
  user,
  setUser,
  captainData,
  setCaptainDataState,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log("captainData:", captainData);
    setIsLoading(false);
  }, [captainData]);

  const fetchCaptainData = async () => {
    try {
      const response = await fetch("/api/getCaptainData");
      if (!response.ok) {
        throw new Error("Failed to fetch captain data");
      }
      const data = await response.json();
      setCaptainDataState(data);
    } catch (error) {
      console.error("Error fetching captain data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetCredentials = async (e) => {
    e.preventDefault();
    if (username && password) {
      if (
        captainData &&
        captainData.some((captain) => captain.username === username)
      ) {
        alert("Username already exists. Please choose a different username.");
        return;
      }

      try {
        console.log("Sending request to create user");
        const response = await fetch("/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        console.log("Response status:", response.status);

        const responseText = await response.text();
        console.log("Response text:", responseText);

        if (!response.ok) {
          throw new Error(`Failed to create user: ${responseText}`);
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          throw new Error("Invalid response from server");
        }

        console.log("User created successfully:", data);

        const newUser = { username, password };
        setUser(newUser);
        setCaptainDataState(
          captainData ? [...captainData, newUser] : [newUser]
        );
        setUsername("");
        setPassword("");
        alert("Credentials set successfully!");
      } catch (error) {
        console.error("Error creating user:", error);
        alert(`Failed to create user: ${error.message}`);
      }
    } else {
      alert("Please enter both username and password.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting login with captainData:", captainData);

    if (!captainData || !Array.isArray(captainData)) {
      console.error("captainData is not an array:", captainData);
      alert("Unable to verify credentials. Please try again later.");
      return;
    }

    const userMatch = captainData.find(
      (captain) =>
        captain.username === username && captain.password === password
    );

    if (userMatch) {
      setUser(userMatch);
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 mb-24">
      {!isLoggedIn ? (
        <div>
          <h2 className="text-xl text-white text-center font-bold mb-4">
            Set Credentials or Login
          </h2>
          <form className="flex flex-col justify-center items-center">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 mb-2 w-full rounded"
            />
            <div className="flex justify-between w-full">
              <button
                type="button"
                onClick={handleSetCredentials}
                className="bg-green-500 text-white p-2 rounded w-[48%]"
              >
                Set Credentials
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="bg-blue-500 text-white p-2 rounded w-[48%]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="absolute top-0 right-0 flex flex-col justify-center items-center m-2 rounded-lg">
          <h2 className="text-xl text-white font-bold mb-2">
            Welcome, {user.username}!
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
