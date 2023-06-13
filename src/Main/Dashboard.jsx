import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAdmine from "../Hook/useAdmine";
import useInstructor from "../Hook/useInstructor";
const Dashboard = () => {
  // const isInstructor = false;
  // const isAdmin = true;
  const [isInstructor] = useInstructor();
  const [isAdmin] = useAdmine();
  return (
    <div className="drawer font-serif ">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-blue-500">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-lg font-sans text-white fony-semibold font-serif">
            Sky Dashboard
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal text-white">
              {isInstructor ? (
                <>
                  <li>
                    <NavLink to="/dashboard/addclass">Add Class</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/myclass">My Class</NavLink>
                  </li>
                </>
              ) : isAdmin ? (
                <>
                  <li>
                    <NavLink to="/dashboard/admin">Admine</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageclass">Manage Class</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageuser">Manage User</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/dashboard/users">Adedd Class</NavLink>
                </li>
              )}

              <div className="divider lg:divider-horizontal"></div>
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>{" "}
              </li>
              <li>
                <NavLink to="/classes"> Our Course</NavLink>
              </li>
              <li>
                <NavLink to="/instructor">Our Instructor</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 font-serif">
          {/* Sidebar content here */}
          {isInstructor ? (
            <>
              <li>
                <NavLink to="/dashboard/addclass">Add Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myclass">My Class</NavLink>
              </li>
            </>
          ) : isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/admin">Admine</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageclass">Manage Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageuser">Manage User</NavLink>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/dashboard/users">Adedd Class</NavLink>
            </li>
          )}

          <div className="divider lg:divider-horizontal"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/classes"> Our Course</NavLink>
          </li>
          <li>
            <NavLink to="/instructor">Our Instructor</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
