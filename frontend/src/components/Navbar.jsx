import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCurrPage } from "../Redux/actions/pageActions";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sticky flex justify-around text-xl bottom-0 w-full py-2 bg-zinc-700 text-white z-50">
      <div onClick={() => dispatch(setCurrPage("home"))}>
        <IoHomeOutline />
      </div>
      <div onClick={() => dispatch(setCurrPage("searchUser"))}>
        <HiMagnifyingGlass />
      </div>
      <div onClick={() => dispatch(setCurrPage("createPost"))}>
        <IoCreateOutline />
      </div>
      <div onClick={() => dispatch(setCurrPage("profile"))}>
        <FaRegUser />
      </div>
    </div>
  );
};

export default Navbar;
