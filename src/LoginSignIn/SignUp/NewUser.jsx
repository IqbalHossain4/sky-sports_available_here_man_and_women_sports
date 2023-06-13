import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HeaderSection from "../../Component/Header/HeaderSection";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const image_hoisting_token = import.meta.env.VITE_imgApi;
const NewUser = () => {
  const { createNewUser, googleSignIn, updateProfiles } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [passError, setPassError] = useState("");
  const [emailError, setEmailError] = useState("");

  // img hoisting
  const img_hoisting_url = `https://api.imgbb.com/1/upload?key=${image_hoisting_token}`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [storeImg, setStoreImg] = useState(null);
  const handleOnchange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("image", selectedFile);
  fetch(img_hoisting_url, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((imgdata) => {
      setStoreImg(imgdata.data.display_url);
    });
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const photo = storeImg;
    console.log(name, email, password, photo);

    // const formData=new FormData();
    // formData.append('image',data.image[0])

    if (password !== confirmPassword) {
      setPassError("Does Not Match Password");
      return;
    }
    if (password === "" && email === "") {
      setPassError("your password field is empty");
      setEmailError("your email field is empty");
      return;
    }

    if (password.length < 6) {
      setPassError("at list 6 character needed");
      return;
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(password)) {
      setPassError("one Capital Latter Needed");

      return;
    }
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(password)) {
      setPassError("Password must contain at least one Special Symbol.");
      return;
    }
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateProfiles(name, photo).then(() => {
          const saveUser = { name: name, photo: photo, email: email };
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                navigate("/");
                console.log(data);
              }
            });
        });
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
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div>
      <HeaderSection text="Please SignUp"></HeaderSection>

      <div className="hero min-h-screen my-custom-bg-class mb-16">
        <div className="hero-content">
          <div className="card flex-shrink-0  px-8 w-full  shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body w-full">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
                <p className="text-red-600">{emailError}</p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  />
                </div>
                <p className="text-red-600">{passError}</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl">Photo</span>
                </label>
                <input type="file" onChange={handleOnchange} />
              </div>

              <div className="form-control mt-6">
                <div className="w-full text-center  py-2 rounded overflow-hidden bg-gradient-to-r from-[#E1AEFF]  to-[#FF78C4]   transition duration-300 ease-in-out ">
                  <input
                    type="submit"
                    className="w-full cursor-pointer font-bold text-2xl hover:translate-x-10 transition duration-300 ease-in-out text-white"
                    value="SignUp"
                  />
                </div>
              </div>
            </form>
            <div className="px-8">
              <div className="mb-8">
                <span className="text-sm">
                  I have an account?
                  <NavLink to="/login" className="text-blue-600">
                    Login
                  </NavLink>
                </span>
              </div>
              <div
                onClick={handlesocial}
                className="w-full mb-16 border rounded"
              >
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
    </div>
  );
};

export default NewUser;
