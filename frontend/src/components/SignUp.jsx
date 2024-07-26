import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../Redux/actions/authActions";
import {
  setErrorMessage,
  setSuccessMessage,
} from "../Redux/actions/messageActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const validateUsername = () => {
    const trimmedInput = username.trim();

    const lowercaseUsername = trimmedInput.toLowerCase();

    const formattedUsername = lowercaseUsername.replace(/\s+/g, "_");

    const sanitizedUsername = formattedUsername.replace(/[^\w]/g, "");

    return sanitizedUsername;
  };
  const handleSignUp = async () => {
    console.log(name, username, email, password, confirmPass);
    if (name == "" || username == "" || password == "" || confirmPass == "") {
      dispatch(setErrorMessage("Please fill all the fields"));
      return;
    }
    if (password != confirmPass) {
      dispatch(setErrorMessage("Passwords do not match"));
      return;
    }
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      confirmPass: confirmPass,
    };
    const response = await axios.post("/api/auth/register", data);
    if (response.status === 200) {
      dispatch(setSuccessMessage(response.data.msg));
      dispatch(setIsLoggedIn(true));
      return;
    }
    if (response.status === 400) {
      dispatch(setErrorMessage(response.data.msg));
      return;
    }
  };
  return (
    <div className="flex justify-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="flex flex-col text-xs px-4 text-gray-100 "
      >
        <legend htmlFor="name">Name</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1 "
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <legend htmlFor="email">Email</legend>
        <input
          className="border-[0.05rem] border-emerald-800 rounded-md text-black placeholder:text-xs placeholder:text-black px-2 py-1"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <legend htmlFor="username">
          Username* (must be unique, only alphanumeric and _ is allowed )
        </legend>
        {username && (
          <span className="text-zinc-200 my-2">
            Your Username will be{" "}
            <span className="text-red-600">{validateUsername()}</span>
          </span>
        )}
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
        <legend htmlFor="confirmPass">Confirm password</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1 "
          type="password"
          name="confirmPass"
          id="confirmPass"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <button
          className="bg-emerald-500 mt-3 text-white w-2/5 mx-auto rounded-md text-xs py-1"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
