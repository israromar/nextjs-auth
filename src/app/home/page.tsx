"use client";

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
          WELCOME HOME
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-sm text-gray-500">
          <Link
            href="/profile"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            PROFILE
          </Link>
        </p>
      </div>
    </div>
  );
}
