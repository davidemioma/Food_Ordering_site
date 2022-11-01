import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const router = useRouter();

  const onClickHandler = async () => {
    if (username.trim() === "" || password.trim() === "") return;

    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          username,
          password,
        })
        .then(() => router.push("/admin"));
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Head>
        <title>Login</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col space-y-3 items-center">
        <h1 className="text-3xl font-bold tracking-wide">Admin Dashboard</h1>

        <input
          className="w-full outline-none bg-transparent py-2 px-4 border border-gray-300"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full outline-none bg-transparent py-2 px-4 border border-gray-300"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-[teal] text-white font-semibold py-1 px-4"
          onClick={onClickHandler}
        >
          Sign In
        </button>

        {error && (
          <p className="text-red-500 font-light text-center">
            Wrong Credentials!
          </p>
        )}
      </main>
    </div>
  );
};

export default Login;
