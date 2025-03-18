"use client";
import axios from "axios";
import Link from "next/link";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="mt-4 w-72 bg-white text-black py-2 rounded-md hover:bg-gray-300 transition font-medium"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="mt-4 w-72 bg-white text-black py-2 rounded-md hover:bg-gray-300 transition font-medium"
      >
        getUserDetails
      </button>
    </div>
  );
}
