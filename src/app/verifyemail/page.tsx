"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("../api/users/verifyemail", { token });
      setIsLoading(false);
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("../api/users/logout");
      if (response?.data?.success) {
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
      <div
        style={{ maxWidth: "40rem" }}
        className="w-full bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
          Verify Email
        </h2>
        <p className="mt-2 text-center text-gray-500">
          {token ? token : "no token"}
        </p>
        {verified && (
          <div className="mt-6">
            <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
              Email Verified
            </h2>
            <button
              onClick={() => router.push("/signin")} // Navigate to the edit profile page
              className="w-full bg-indigo-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
            >
              Login
            </button>
          </div>
        )}
        {error ||
          (isLoading && (
            <div className="mt-6">
              <h2 className="mt-4 text-center text-xl font-semibold text-gray-800">
                {isLoading ? "Verifying..." : "Something went wrong!"}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
