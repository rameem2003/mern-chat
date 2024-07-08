import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(false);
  const [name, setName] = useState("");
  const [nameerr, setNameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passerror, setPasserrorErr] = useState(false);
  const [file, setFile] = useState(null);
  const [hide, setHide] = useState(true);
  const [success, isSuccess] = useState(false);

  const handleToggle = () => {
    setHide(!hide);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr(true);
    }
    if (!name) {
      setNameErr(true);
    }

    if (!file) {
    }
    if (!password) {
      setPasserrorErr(true);
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(true);
    }

    if (email && name && password) {
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 flex items-center justify-end mr-[69px]">
        <div>
          <h1 className="font-nunito font-bold text-[35px] text-primary mb-3">
            Get started with easily register
          </h1>
          <p className="font-nunito font-normal text-[21px] text-primary">
            Free register and you can enjoy it
          </p>

          <form action="">
            {/* email entry start */}
            <div className=" relative mt-[62px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary bg-white px-4 absolute top-[-8px] left-[40px]"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                className="w-[368px] h-[81px] rounded-lg  border-[1.72px] border-primary font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]"
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
                  <p className="text-red-600">
                    Invalid email or email already exist
                  </p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[156px]"
                  />
                </>
              )}
            </div>
            {/* email entry end */}

            {/* name entry start */}
            <div className=" relative mt-[62px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary bg-white px-4 absolute top-[-8px] left-[40px]"
                htmlFor=""
              >
                Full name
              </label>
              <input
                className="w-[368px] h-[81px] rounded-lg  border-[1.72px] border-primary font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]"
                onChange={(e) => {
                  setName(e.target.value);
                  setNameErr(false);
                }}
                type="text"
                name=""
                id=""
              />
              {nameerr && (
                <>
                  <p className="text-red-600">Name field is empty</p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[156px]"
                  />
                </>
              )}
            </div>
            {/* name entry end */}

            {/* password entry start */}
            <div className=" relative mt-[62px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary bg-white px-4 absolute top-[-8px] left-[40px]"
                htmlFor=""
              >
                Password
              </label>
              <input
                className="w-[368px] h-[81px] rounded-lg  border-[1.72px] border-primary font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]"
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
                  className="absolute top-[28px] right-[156px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[28px] right-[156px] cursor-pointer"
                />
              )}

              {passerror && (
                <>
                  <p className="text-red-600">
                    Password field is empty or weak password
                  </p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[190px]"
                  />
                </>
              )}
            </div>
            {/* password entry end */}

            <div className=" mt-[62px]">
              <input
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
                type="file"
                name=""
                id=""
              />
            </div>

            {success ? (
              <div className=" flex justify-center w-[368px]">
                <h1>Load</h1>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className=" font-nunito font-semibold text-[21px] text-white bg-secondary px-[147px] py-[20px] rounded-[86px] mt-[51px]"
              >
                Sign up
              </button>
            )}

            <p className="font-openSans font-normal text-[13px] text-dark mt-[35px] text-center w-[368px]">
              Already have an account ?{" "}
              <Link
                className=" font-bold
               text-orange"
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2">
        <img
          className="w-full h-screen object-cover"
          src="/signup.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
