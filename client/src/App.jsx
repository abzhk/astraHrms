import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import DeveloperDashboard from "./Pages/Dashboard/developerDashboard";
import AdminDashboard from "./Pages/Dashboard/adminDashboard";
import ManagerDashboard from "./Pages/Dashboard/managerDashboard";
import Allemployee from "./pages/allEmployees";
import Landing from "./pages/Landing";
import { Toaster } from "sonner";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./Pages/Login";
import ContactForm from "./Pages/Dashboard/content/contactForm";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import PROFILE from "./Pages/Profile/profile";
import ProjectMain from "./Pages/Project/Admin/main";
import EmpProject from "./Pages/Project/Employee/EmpProject";
// import DemoCreation from "./Pages/demo/demoCreation";
// import DemoTable from "./Pages/demo/demoTable";


function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/profile" element={<PROFILE />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/profile" element={<PROFILE />} />
          <Route path="/main" element={<ProjectMain />} />

          {/* Dashboard Routes */}
          <Route path="/developerDashboard" element={<DeveloperDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/managerDashboard" element={<ManagerDashboard />} />
          <Route path="/contactForm" element={<ContactForm />} />

          {/* AddemployeeRoutes */}
          <Route path="/allEmployee" element={<Allemployee />} />
          <Route path="/employee" element={<EmpProject />} />
          

          {/* <Route path="/studcreate" element={< DemoCreation/>} />
          <Route path="/studtable" element={< DemoTable/>} /> */}

          





        </Route>
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
