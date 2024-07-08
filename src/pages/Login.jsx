import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passerror, setPasserrorErr] = useState(false);
  const [hide, setHide] = useState(true);
  const [success, isSuccess] = useState(false);
  const handleToggle = () => {
    setHide(!hide);
  };

  const handleGoogleAuth = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr(true);
    }

    if (!password) {
      setPasserrorErr(true);
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(true);
    }

    if (email && password) {
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 flex items-center justify-end mr-[215px]">
        <div>
          <h1 className="font-nunito font-bold text-[35px] text-primary mb-3">
            Login to your account!
          </h1>

          <button
            onClick={handleGoogleAuth}
            className=" font-openSans font-semibold text-[13px] text-dark border-[0.83px] border-dark rounded-[8px] px-[42px] py-[21px] mt-[29px]"
          >
            {" "}
            <FcGoogle size={25} className=" inline-block" /> Login with Google
          </button>

          <form action="">
            <div className=" relative mt-[62px]">
              <label
                className="font-openSans font-normal text-[13px] text-dark absolute top-[-10px] left-0"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                className="w-[368px] h-[81px] border-b-[0.83px] border-dark font-openSans font-semibold text-[21px] text-primary py-[16px] outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                }}
                type="email"
                name=""
                id=""
              />
              {emailerr && (
                <>
                  <p className="text-red-600">Please enter valid email</p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[55px]"
                  />
                </>
              )}
            </div>
            <div className=" relative mt-[62px]">
              <label
                className="font-openSans font-normal text-[13px] text-dark absolute top-[-10px] left-0"
                htmlFor=""
              >
                Password
              </label>
              <input
                className="w-[368px] h-[81px] border-b-[0.83px] border-dark font-openSans font-semibold text-[21px] text-primary py-[16px] outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasserrorErr(false);
                }}
                type={hide ? "password" : "text"}
                name=""
                id=""
              />

              {hide ? (
                <FaEye
                  onClick={handleToggle}
                  size={25}
                  className="absolute text-gray-500 top-[28px] right-[55px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute text-gray-500 top-[28px] right-[55px] cursor-pointer"
                />
              )}

              {passerror && (
                <>
                  <p className="text-red-600">Password field is empty</p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[85px]"
                  />
                </>
              )}
            </div>

            {success ? (
              <div className=" flex justify-center">
                <h1>Load</h1>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="font-nunito font-semibold text-[21px] text-white bg-secondary px-[122px] py-[20px] rounded-[8px] shadow-lg mt-[51px]"
              >
                Login to Continue
              </button>
            )}

            <p className="font-openSans font-normal text-[13px] text-dark mt-[35px] ps-[15px]">
              Don’t have an account ?{" "}
              <Link
                className=" font-bold
               text-orange"
                to="/signup"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2">
        <img className="w-full h-screen object-cover" src="/login.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
