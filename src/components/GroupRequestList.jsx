import React, { useState } from "react";
import ChatAccept from "./ChatAccept";
import SearchSection from "./common/SearchSection";
import { BiPlus } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";
import { db } from "../config/firebase.config";

const GroupRequestList = () => {
  // user data
  const data = useSelector((state) => state.user.user);
  const [newGroupModal, setNewGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  const handleSubmit = () => {
    set(push(ref(db, "groupList/")), {
      groupName,
      adminName: data.displayName,
      adminID: data.uid,
      adminPhotoURL: data.photoURL,
      date: Date.now(),
    }).then(() => setNewGroupModal(false));

    // console.log(groupName);
  };
  return (
    <div>
      <SearchSection />
      <div className="px-[23px] py-[13px] mt-[43px] shadow-custom rounded-[20px]">
        <div
          className={` duration-500 ease-in-out fixed ${
            newGroupModal ? "opacity-100 z-50" : "opacity-0 z-[-1]"
          } top-0 left-0 bg-white/60 backdrop-blur-md h-screen w-full`}
        >
          <div
            className={` duration-500 ease-in-out opacity-0 fixed top-[50%] left-[50%] translate-x-[-50%] ${
              newGroupModal
                ? "translate-y-[-50%] opacity-100"
                : "translate-y-[-350%] "
            }  z-50 w-[500px] h-auto shadow-2xl rounded-lg p-3 bg-white`}
          >
            <FaTimes
              onClick={() => setNewGroupModal(false)}
              className="text-xl ml-auto mb-2 cursor-pointer"
            />

            <div className="mb-5">
              <label
                className=" font-semibold text-lg text-secondary"
                htmlFor=""
              >
                New Group Name
              </label>

              <input
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full border-[2px] border-secondary p-3 rounded-lg"
                type="text"
                name=""
                id=""
              />
            </div>

            <button
              onClick={handleSubmit}
              className=" flex items-center justify-center gap-1 py-1 px-3 bg-secondary font-bold text-xl text-white rounded-sm "
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            Groups Request
          </h2>
          <BiPlus
            onClick={() => setNewGroupModal(true)}
            size={25}
            className="text-secondary cursor-pointer"
          />
        </div>

        <div className="h-[300px] overflow-y-scroll no-scrollbar">
          <ChatAccept />
          <ChatAccept />
          <ChatAccept />
          <ChatAccept />
        </div>
      </div>
    </div>
  );
};

export default GroupRequestList;
