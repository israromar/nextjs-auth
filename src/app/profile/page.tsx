"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get("../api/users/me");
    setIsLoading(false);
    if (response.data.success) {
      setUser(response.data.data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("../api/users/logout");
      if (response.data.success) {
        router.push("/signin");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt={`${user.username} avatar`}
            className="h-20 w-20 rounded-full"
          />
        </div>
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          {isLoading ? "Loading..." : user.username}
        </h2>
        <p className="mt-2 text-center text-gray-500">{user?.email}</p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/edit-profile")} // Navigate to the edit profile page
            className="w-full bg-indigo-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout} // Log out the user
            className="mt-3 w-full text-center text-gray-500 font-semibold hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
