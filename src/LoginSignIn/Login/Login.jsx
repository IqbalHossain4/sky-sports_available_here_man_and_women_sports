import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HeaderSection from "../../Component/Header/HeaderSection";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { useEffect } from "react";
const titleHook = (title) => {
  useEffect(() => {
    document.title = `Sky-${title}`;
  }, [title]);
};

const Login = () => {
  const [pass, setPass] = useState(false);
  const { login, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  titleHook("Login");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlesocial = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from);
        });
    });
  };

  return (
    <div>
      <HeaderSection text="Please Login"></HeaderSection>

      <div className="hero my-custom-bg-class mb-16">
        <div className="hero-content">
          <div className="card flex-shrink-0 h-[450px] w-[500px] px-8 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body w-full ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={!pass ? "password" : "text"}
                    name="password"
                    placeholder="password"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
                  />
                  <div className="absolute top-[25%] right-[5%]">
                    {!pass ? (
                      <button className="w-8" onClick={() => setPass(true)}>
                        <FaEyeSlash />
                      </button>
                    ) : (
                      <button className="w-8" onClick={() => setPass(!pass)}>
                        <FaEye />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-control mt-6">
                <div className="w-full text-center  py-2 rounded overflow-hidden bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]  transition duration-300 ease-in-out ">
                  <input
                    type="submit"
                    className="w-full cursor-pointer font-bold text-2xl hover:translate-x-10 transition duration-300 ease-in-out text-white"
                    value="Login"
                  />
                </div>
              </div>
            </form>
            <div className="mb-8">
              <span className="text-sm">
                New User?{" "}
                <NavLink to="/signup" className="text-blue-600">
                  SignUp
                </NavLink>
              </span>
            </div>
            <div onClick={handlesocial} className="w-full mb-16 border rounded">
              <NavLink>
                <img
                  className="mx-auto"
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  width="40px"
                  alt="logo"
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
