import React from "react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import axios from "axios";

const EditProfile = ({ user, setEditMode }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");

  const validateUsername = () => {
    const trimmedInput = username.trim();

    const lowercaseUsername = trimmedInput.toLowerCase();

    const divattedUsername = lowercaseUsername.replace(/\s+/g, "_");

    const sanitizedUsername = divattedUsername.replace(/[^\w]/g, "");

    return sanitizedUsername;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with only the changed fields
    const updatedFields = {};
    updatedFields.password = password;
    if (name !== user.name) updatedFields.name = name;
    if (email !== user.email) updatedFields.email = email;
    if (username !== user.username) updatedFields.username = username;
    const sanitizedUsername = validateUsername();
    if (sanitizedUsername !== user.username)
      updatedFields.username = sanitizedUsername;

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes to update");
      return;
    }

    try {
      const response = await axios.put("/api/auth/editProfile", updatedFields);
      alert(response.data.msg);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="w-full h-screen pt-4 pl-4">
      <div className="flex px-3 py-2 items-center gap-5 text-xs relative">
        <div className="h-8 w-8 bg-yellow-500 rounded-full">
          <img src="" alt="" />
        </div>
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span>{user?.username}</span>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <span>Followers</span>
            <span>{user?.followers?.length}</span>
          </div>
          <div className="flex flex-col items-center">
            <span>Following</span>
            <span>{user?.following?.length}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-xs px-4 text-gray-100 mt-8">
        <h2 className="mb-3 text-lg">Edit Your Profile</h2>
        <legend htmlFor="name">Name</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1 "
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <legend htmlFor="email">Email</legend>
        <input
          className="border-[0.05rem] border-emerald-800 rounded-md text-black placeholder:text-xs placeholder:text-black px-2 py-1"
          type="email"
          name="email"
          id="email"
          value={email}
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
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <legend htmlFor="password">Enter your Password to verify</legend>
        <input
          className="border-[0.05rem] text-black border-emerald-800 rounded-md placeholder:text-xs placeholder:text-black px-2 py-1 "
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-emerald-500 mt-3 text-white w-2/5 mx-auto rounded-md text-xs py-1"
          type="submit"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
  user: PropTypes.object,
  setEditMode: PropTypes.func,
};

export default EditProfile;
