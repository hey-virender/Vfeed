import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { useState } from "react";

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const changeForm = (value) => {
    setIsSignIn(value);
  };

  return (
    <div className="relative">
      <div className="mx-auto mb-2 w-2/5 relative flex justify-center  gap-2 border-2 border-green-400 text-xs rounded-full">
        <button
          onClick={() => changeForm(true)}
          className={`${
            isSignIn && "text-white"
          } px-2 py-1 z-10 ease-in-out transition-all duration-500`}
        >
          Sign In
        </button>
        <button
          onClick={() => changeForm(false)}
          className={`${
            !isSignIn && "text-white"
          } px-2 py-1 z-10 ease-in-out transition-all duration-500`}
        >
          Sign Up
        </button>
        <div
          className={`absolute h-full left-0  w-1/2 bg-emerald-500 rounded-full z-0 ease-in-out transition-all duration-500 ${
            isSignIn ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
      </div>
      {isSignIn ? <SignIn /> : <SignUp />}
    </div>
  );
};

export default AuthForm;
