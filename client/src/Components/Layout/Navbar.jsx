import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./Notifications";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-white shadow-md px-6 py-4 sticky z-10 top-0">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          ☰
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-64 2xl:w-[400px] flex items-center py-2 px-4 gap-3 rounded-full bg-gray-100 border border-gray-300">
          <MdOutlineSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search...."
            className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-700"
          />
        </div>
        <NotificationPanel />
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
