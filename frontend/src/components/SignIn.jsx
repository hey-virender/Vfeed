import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../Redux/actions/authActions";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../Redux/actions/messageActions";
const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const response = await axios.post("/api/auth/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        dispatch(setSuccessMessage(response.data.msg));
        dispatch(setIsLoggedIn(true));
        return;
      }
    } catch (e) {
      if (e.response.status === 403) {
        dispatch(setErrorMessage(e.response.data.msg));
        return;
      }
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
        className="flex flex-col text-xs px-4 bg-transparent gap-1"
      >
        <legend htmlFor="username">Username</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1"
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <legend htmlFor="password">Password</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1 "
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-emerald-500 mt-5 text-white w-2/5 mx-auto rounded-md text-xs py-1"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
