"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";


export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp failed", error.message);
      toast.error(error.messsage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-400 p-4">
      <h1 className="text-2xl font-semibold text-white-800">
        {loading ? "Processing" : " SignUp"}
      </h1>
      <hr className="w-full max-w-xs my-2 border-gray-300" />

      <label htmlFor="username" className="text-white-600 font-medium mt-2">
        Username
      </label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter username"
        className="w-72 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
      />

      <label htmlFor="email" className="text-white-600 font-medium mt-2">
        Email
      </label>
      <input
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter email"
        className="w-72 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
      />

      <label htmlFor="password" className="text-white-600 font-medium mt-2">
        Password
      </label>
      <input
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter password"
        className="w-72 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
      />
      <button
        onClick={onSignUp}
        className="mt-4 w-72 bg-white text-black py-2 rounded-md hover:bg-gray-300 transition font-medium"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link
        href="/login"
        className="mt-2 text-white hover:underline hover:text-gray-300 transition"
      >
        Visit Login page
      </Link>
    </div>
  );
}
