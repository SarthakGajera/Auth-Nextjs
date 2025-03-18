"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-400 p-4">
      <h1 className="text-2xl font-semibold text-white-800">{loading ? "Processsing" : "Login"}</h1>
      <hr className="w-full max-w-xs my-2 border-gray-300" />

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
        onClick={onLogin}
        className="mt-4 w-72 bg-white text-black py-2 rounded-md hover:bg-gray-300 transition font-medium"
      >
        Login
      </button>
      <Link
        href="/signup"
        className="mt-2 text-white hover:underline hover:text-gray-300 transition"
      >
        Visit SignUp page
      </Link>
    </div>
  );
}
