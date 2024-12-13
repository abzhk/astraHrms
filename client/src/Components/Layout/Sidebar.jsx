import React from "react";
import { MdDashboard, MdSettings } from "react-icons/md";
import { FaArchway } from "react-icons/fa6";
import { FaRegCalendarCheck, FaUserLarge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../../redux/slices/authSlice";
import clsx from "clsx";
import logoCapz from "../../assets/logoCapz.png";

const adminLinks = [
  {
    label: "Dashboard",
    link: "adminDashboard",
    icon: <MdDashboard />,
  },
  {
    label: "User Management",
    link: "allEmployee",
    icon: <FaArchway />,
  },
  {
    label:"Project",
    link:"main",
    icon: <FaArchway />,
  }
];

const userLinks = [
  {
    label: "Dashboard",
    link: "developerDashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Profile",
    link: "profile",
    icon: <FaUserLarge />,
  },
  {
    label: "Project",
    link: "employee",
    icon: <FaUserLarge />,
  },


];

const managerLinks = [
  {
    label: "Dashboard",
    link: "managerDashboard",
    icon: <MdDashboard />,
  },

];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1]; // Get the current path

  let sidebarLinks = [];
  if (user.isAdmin) {
    sidebarLinks = adminLinks;
  } else if (user.isManager) {
    sidebarLinks = managerLinks;
  } else {
    sidebarLinks = userLinks;
  }

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    const isActive = path === el.link;

    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full flex gap-2 px-4 py-3 rounded-full items-center transition duration-300 ease-in-out",
          isActive
            ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white" // Background color for the selected item
            : "hover:bg-gray-200 hover:text-black"
        )}
      >
        {el.icon}
        <span
          className={clsx(
            isActive ? "text-white" : "text-gray-600", // Active text color
            "hover:text-black" // Hover text color
          )}
        >
          {el.label}
        </span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-white lg:max-w-xs">
      <div className="flex items-center gap-2">
        <img src={logoCapz} className="p-4 w-40 h-auto" alt="Logo" />
      </div>
      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg  rounded-full">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
