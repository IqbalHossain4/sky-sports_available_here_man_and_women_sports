import { useContext, useState } from "react";
import { FaShoppingCart,FaHome,} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/sports-day.png";
import { AuthContext } from "../../../Context/AuthProvider";
import useCourse from "../../../Hook/useCourse";
import useInstructor from "../../../Hook/useInstructor";
import useAdmine from "../../../Hook/useAdmine";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCourse();
  const [handleProfile, setHandleProfile] = useState(true);

  const [isAdmin] = useAdmine();
  const [isInstructor] = useInstructor();
  // const isInstructor = false;
  // const isAdmin = true;

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
      <span>
      <FaHome/>
        <NavLink to="/">Home</NavLink>
      </span>
      </li>
      <li>
      <span>
     
        <NavLink to="/instructor">Instructors</NavLink>
        </span>
      </li>
      <li>
        <NavLink to="/classes">Classes</NavLink>
      </li>
      <li>
        <button>
          <FaShoppingCart />
          <div className="badge badge-secondary">{cart.length || 0}</div>
        </button>
      </li>

      <li>
        {!user && (
          <span>
            <NavLink to="/login">Login</NavLink>
          </span>
        )}
      </li>
    </>
  );
  console.log(isAdmin, isInstructor);
  return (
    <>
      <div className="navbar max-w-screen-xl font-serif  bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  text-white px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact font-semibold dropdown-content mt-3 p-2 shadow bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  text-white px-6 rounded-box w-52 z-20"
            >
              {navOptions}
            </ul>
          </div>

          <div className="hidden lg:flex">
            <NavLink to="/">
              <img src={logo} alt="logo" width="60px" />
              <h4 className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#28f30d] to-[#000000] font-serif">
                SKY SPORTS
              </h4>
            </NavLink>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul
            id="sidebar"
            className="menu menu-horizontal  px-1 font-semibold "
          >
            {navOptions}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="hidden lg:block">
            <a className="btn  w-[200px]">
              <marquee className=" text-pink-500">
                WelCome to Sky Sports Ltd
              </marquee>
            </a>
          </div>
          {user && (
            <button
              className="relative w-[50px] h-[50px]"
              onClick={() => setHandleProfile(!handleProfile)}
            >
              <img
                className="border w-full h-full rounded-full ml-4"
                title="Profile"
                src={user?.photoURL}
                alt="User Logo"
              />
            </button>
          )}
        </div>

        <div
          className={`absolute z-50 right-[40px] lg:right-[60px] top-[70px] lg:top-[80px] transform py-4 px-6 bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  text-white font-semibold   ${
            !handleProfile ? "block" : "hidden"
          } ${user ? "block" : "hidden"}`}
        >
          {user && (
            <ul>
              {isInstructor && (
                <li>
                  <NavLink to={"/dashboard/addclass"}>Dashboard</NavLink>
                </li>
              )}

              {isAdmin && (
                <li>
                  <NavLink to={"/dashboard/admin"}>Dashboard</NavLink>
                </li>
              )}
              {!isInstructor && !isAdmin && (
                <li>
                  <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
                </li>
              )}

              <li onClick={handleLogOut} className="cursor-pointer mt-2">
                LogOut
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
