import React, { useContext, useEffect, useState } from "react";
import Flex from "./../components/common/Flex";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../config/firebase.config";
import { ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { InfinitySpin } from "react-loader-spinner";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  // context
  const { setUser } = useContext(AuthContext);
  // navigate
  const navigate = useNavigate();
  // firebase auth provider
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  // all states
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passerror, setPasserrorErr] = useState(false);
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleCheckOnline = () => {
    setIsOnline(navigator.onLine);
  };

  const handleToggle = () => {
    setHide(!hide);
  };
  useEffect(() => {
    window.addEventListener("online", handleCheckOnline);

    window.addEventListener("offline", handleCheckOnline);
  }, []);

  const handleFacebookAuth = () => {
    setLoading(true);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        toast.success("Login Successfull", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        console.log(errorCode);

        setLoading(false);
        if (errorCode.includes("auth/operation-not-allowed")) {
          toast.error("Something going wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        if (
          errorCode.includes("auth/account-exists-with-different-credential")
        ) {
          toast.error("User Already Exist", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        set(ref(db, "users/" + user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        setUser(user);

        console.log(user);

        toast.success("Signup Successfull", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorCode);

        if (errorCode.includes("auth/operation-not-allowed")) {
          toast.error("Something going wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr(true);
      setLoading(false);
    }
    if (!password) {
      setPasserrorErr(true);
      setLoading(false);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(true);
      setLoading(false);
    } else if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          setUser(user);

          // ...

          toast.success("Login Successfull", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorMessage);

          if (errorMessage.includes("auth/invalid-credential")) {
            setLoading(false);
            toast.error("Invalid Credential", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    }
  };
  return (
    <div className="flex px-3 lg:p-0 h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className=" w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:mr-[215px]">
        <div>
          <h1 className="font-nunito font-bold text-[35px] text-primary mb-3">
            Login to your account!
          </h1>

          <div>
            {isOnline ? (
              ""
            ) : (
              <h2 className=" font-nunito font-medium text-lg text-red-500">
                Opps Looks Like You Are In Offline
              </h2>
            )}
          </div>

          <Flex className="gap-5">
            <button
              onClick={handleGoogleAuth}
              className=" font-openSans font-semibold text-[13px] text-dark border-[0.83px] border-dark rounded-[8px] px-[42px] py-[21px] mt-[29px]"
            >
              <FcGoogle size={25} className=" inline-block" /> Login with Google
            </button>
            {/* <button
              onClick={handleFacebookAuth}
              className=" font-openSans font-semibold text-[13px] text-dark border-[0.83px] border-dark rounded-[8px] px-[42px] py-[21px] mt-[29px]"
            >
              <IoLogoFacebook size={25} className=" inline-block" /> Login with
              Facebook
            </button> */}
          </Flex>

          <form action="">
            <div className=" relative mt-[62px]">
              <label
                className="font-openSans font-normal text-[13px] text-dark absolute top-[-10px] left-0"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                className=" w-full lg:w-[368px] h-[81px] border-b-[0.83px] border-dark font-openSans font-semibold text-[21px] text-primary py-[16px] outline-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErr(false);
                }}
                type="email"
                name=""
                id="email"
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
                className=" w-full lg:w-[368px] h-[81px] border-b-[0.83px] border-dark font-openSans font-semibold text-[21px] text-primary py-[16px] outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasserrorErr(false);
                }}
                type={hide ? "password" : "text"}
                name=""
                id="pass"
              />

              {hide ? (
                <FaEye
                  onClick={handleToggle}
                  size={25}
                  className="absolute text-gray-500 top-[28px] right-3 lg:right-[55px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute text-gray-500 top-[28px] right-3 lg:right-[55px] cursor-pointer"
                />
              )}

              {passerror && (
                <>
                  <p className="text-red-600">
                    Password field is empty or invalid password
                  </p>
                  <MdError
                    size={25}
                    className="text-red-600 absolute top-[28px] right-[85px]"
                  />
                </>
              )}
            </div>

            {loading ? (
              <div className=" flex justify-center">
                <div className=" flex items-center justify-center w-[386px] ">
                  <InfinitySpin
                    visible={true}
                    width="200"
                    color="#5f35f5"
                    ariaLabel="infinity-spin-loading"
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="font-nunito font-semibold text-base lg:text-[21px] text-white bg-secondary w-full lg:w-auto lg:px-[100px] py-[20px] rounded-[8px] shadow-lg mt-[51px]"
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
      <div className=" hidden lg:block lg:w-1/2">
        <img className="w-full h-screen object-cover" src="/login.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
