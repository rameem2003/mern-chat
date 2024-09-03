import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import {
  getStorage,
  ref as fireBaseStorageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db } from "../config/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { MdError } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(false);
  const [name, setName] = useState("");
  const [nameerr, setNameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passerror, setPasserrorErr] = useState(false);
  const [file, setFile] = useState("");
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);

  const storage = getStorage();
  const storageRef = fireBaseStorageRef(storage, `userAvater/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  const handleToggle = () => {
    setHide(!hide);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setEmailErr(true);
      setLoading(false);
    }
    if (!name) {
      setNameErr(true);
      setLoading(false);
    }
    if (!file) {
      toast.error("Upload Your Profile", {
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
    if (!password) {
      setPasserrorErr(true);
      setLoading(false);
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr(true);
      setLoading(false);
    } else if (email && name && password && file) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(() => {
            console.log(user);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                // Handle unsuccessful uploads
                console.log(error);
              },
              () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);

                  updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: downloadURL,
                  })
                    .then(() => {
                      set(ref(db, "users/" + user.uid), {
                        displayName: name,
                        email: email,
                        photoURL: downloadURL,
                        create: Date.now(),
                      });

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
                        navigate("/login");
                      }, 2000);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              }
            );
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // console.log(errorMessage);

          if (errorMessage.includes("auth/email-already-in-use")) {
            setEmailErr(true);
            setLoading(false);
          }

          if (errorMessage.includes("auth/weak-password")) {
            setPasserrorErr(true);
            setLoading(false);
          }
        });
    }
  };
  return (
    <div className="flex px-3 h-auto md:h-screen">
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
      <div className=" w-full lg:w-1/2 flex items-center justify-center lg:justify-end lg:mr-[69px]">
        <div>
          <h1 className="font-nunito font-bold text-[25px] xl:text-[35px] text-center lg:text-left text-primary mb-3">
            Get started with easily register
          </h1>
          <p className="font-nunito font-normal text-[21px] text-center lg:text-left text-primary">
            Free register and you can enjoy it
          </p>

          <form action="">
            {/* email entry start */}
            <div className=" relative mt-5 2xl:mt-[62px]">
              <label
                className="font-nunito font-semibold text-[13px] text-primary bg-white px-4 absolute top-[-8px] left-[40px]"
                htmlFor=""
              >
                Email Address
              </label>
              <input
                className={`w-full lg:w-[368px] h-[81px] rounded-lg  border-[1.72px] ${
                  emailerr ? "border-red-500" : "border-primary"
                }  font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]`}
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
                className={`w-full lg:w-[368px] h-[81px] rounded-lg  border-[1.72px] ${
                  nameerr ? "border-red-500" : "border-primary"
                }  font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]`}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameErr(false);
                }}
                type="text"
                name=""
                id="name"
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
                className={`w-full lg:w-[368px] h-[81px] rounded-lg  border-[1.72px] ${
                  passerror ? "border-red-500" : "border-primary"
                }  font-nunito font-semibold text-[21px] text-primary px-[52px] py-[26px]`}
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
                  className="absolute top-[28px] right-3 xl:right-[156px] cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={handleToggle}
                  size={25}
                  className="absolute top-[28px] right-3 xl:right-[156px] cursor-pointer"
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

            {loading ? (
              <div className=" flex items-center justify-center w-[386px] ">
                <InfinitySpin
                  visible={true}
                  width="200"
                  color="#5f35f5"
                  ariaLabel="infinity-spin-loading"
                />
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className=" font-nunito font-semibold text-[21px] text-white bg-secondary w-full lg:w-auto px-[100px] py-[20px] rounded-[86px] mt-[51px]"
              >
                Sign up
              </button>
            )}

            <p className="font-openSans font-normal text-[13px] text-dark mt-2 2xl:mt-[35px] text-center w-[368px]">
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
      <div className=" hidden lg:block lg:w-1/2">
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
