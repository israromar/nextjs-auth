"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
  });
  const [userData, setUserData] = React.useState<any>(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const getUserData = async () => {
    setIsLoading(true);
    const response = await axios.get("../api/users/me");
    setIsLoading(false);
    if (response?.data?.success) {
      setUser(response?.data?.data);
      setUserData(response?.data?.data);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {
    const isUpdated =
      userData?.username !== user.username || userData?.email !== user.email;

    const isFormStateChanged =
      user?.email?.length > 0 && user?.username?.length > 0;

    if (isFormStateChanged && isUpdated) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onUpdate = async (event: any) => {
    event.preventDefault();

    // check if any fields has been changed
    const updateUsername = userData?.username !== user.username;
    const updateEmail = userData?.email !== user.email;

    if (updateUsername || updateEmail) {
      try {
        setIsUpdating(true);
        const payload = {
          username: user.username,
          oldEmail: userData?.email,
          newEmail: user.email,
          updateUsername,
          updateEmail,
        };
        const response = await axios.post(
          "../api/users/updateprofile",
          payload
        );
        if (response?.data?.success) {
          toast.success("Profile updated Successfully!");
          if (updateEmail) {
            toast.success("Check your email for verification");
          }
          router.push("/profile");
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.error || error?.message);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          Edit Profile
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                autoComplete="username"
                required
                placeholder="Enter username"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="email"
                required
                placeholder="Enter email address"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={onUpdate}
              disabled={isDisabled || isLoading || isUpdating}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading
                ? "Loading..."
                : isUpdating
                ? "Updating profile..."
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
