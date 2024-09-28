import React, { createRef, useState } from "react";
import {
  IoHomeOutline,
  IoChatbubbleEllipses,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegBell, FaTimes } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { ImUpload } from "react-icons/im";
import { IoMdCloudUpload } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { ref as databaseref, update } from "firebase/database";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { AuthReducer } from "../../redux/featurea/AuthSlice";
import LoadingAnimation from "../common/LoadingAnimation";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Navigation = () => {
  // states for react corpper
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  // dispatch instance
  const dispatch = useDispatch();
  // user data
  const data = useSelector((state) => state.user.user);

  // navigation
  const navigate = useNavigate();
  // function for signout
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(AuthReducer(null));
      navigate("/login");
    });
  };

  // image upload
  const handleImagefile = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // handle image submit
  const handleSubmit = () => {
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `userAvater/${Date.now()}`);
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              dispatch(AuthReducer(auth.currentUser));
              console.log(auth.currentUser);
            })
            .then(() => {
              update(databaseref(db, "users/" + data.uid), {
                photoURL: downloadURL,
              });
            })
            .then(() => {
              setCropData("");
              setImage("");
              setModal(false);
              setLoading(false);
            });
        });
      });
    }
  };

  return (
    <>
      {loading && <LoadingAnimation />}
      <div
        className={` duration-500 ease-in-out opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] ${
          modal ? "translate-y-[-50%] opacity-100" : "translate-y-[-350%] "
        }  z-50 w-[500px] h-auto shadow-2xl rounded-lg p-3 bg-white`}
      >
        <FaTimes
          onClick={() => setModal(false)}
          className="text-xl ml-auto mb-2 cursor-pointer"
        />

        <label
          htmlFor="uploadFile1"
          className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 mb-2 fill-gray-500"
            viewBox="0 0 32 32"
          >
            <path
              d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
              data-original="#000000"
            />
            <path
              d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
              data-original="#000000"
            />
          </svg>
          Upload file
          <input
            onChange={handleImagefile}
            type="file"
            id="uploadFile1"
            className="hidden"
          />
          <p className="text-xs font-medium text-gray-400 mt-2">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
        </label>

        {image && (
          <div className="mt-5">
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
          </div>
        )}

        <div className=" my-5 text-center">
          <button
            onClick={handleSubmit}
            className=" mx-auto flex items-center justify-center gap-1 py-1 px-3 bg-secondary font-bold text-xl text-white rounded-full "
          >
            <IoMdCloudUpload />
            Upload
          </button>
        </div>
      </div>
      <nav className="bg-secondary h-full flex items-center flex-col rounded-[20px]">
        <div className="mt-[24px] h-[100px] w-[100px] rounded-full object-cover relative overflow-hidden  group">
          <div
            onClick={() => setModal(true)}
            className=" flex items-center justify-center w-full h-full duration-300 ease-in-out opacity-0 group-hover:opacity-100 bg-black/30 rounded-full absolute top-0 left-0 cursor-pointer"
          >
            <ImUpload className=" text-5xl text-white" />
          </div>
          <img
            className="w-full h-full rounded-full object-cover"
            src={data?.photoURL}
            alt=""
          />
        </div>

        <p className=" mt-5 text-center font-semibold text-xl text-white">
          {data?.displayName}
        </p>

        <ul className="mt-[50px] ps-[18px]">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative inline-block  text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] ${
                  isActive
                    ? " text-secondary bg-white after:bg-secondary"
                    : "  text-white bg-secondary"
                }  `
              }
            >
              <IoHomeOutline />
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `relative inline-block  text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] ${
                  isActive
                    ? " text-secondary bg-white after:bg-secondary"
                    : "  text-white bg-secondary"
                }  `
              }
              href="#"
            >
              <IoChatbubbleEllipses />
            </NavLink>
          </li>
          <li>
            <a
              className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
              href="#"
            >
              <FaRegBell />
            </a>
          </li>
          <li>
            <NavLink
              to="/setting"
              className={({ isActive }) =>
                `relative inline-block  text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] ${
                  isActive
                    ? " text-secondary bg-white after:bg-secondary"
                    : "  text-white bg-secondary"
                }  `
              }
              href="#"
            >
              <IoSettingsOutline />
            </NavLink>
          </li>
          <li className="mt-[116px]">
            <button
              onClick={handleSignOut}
              className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
            >
              <GrLogout />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
