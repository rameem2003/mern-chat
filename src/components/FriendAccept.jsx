import React from "react";
import Flex from "./common/Flex";
import moment from "moment";
import { push, ref, remove, set } from "firebase/database";
import { db } from "../config/firebase.config";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const FriendAccept = ({ data }) => {
  console.log(data);

  const handleAccept = (data) => {
    set(push(ref(db, "frinedList/")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.key));
    });
  };

  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.key));
  };
  return (
    <Flex className=" items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[70px] h-[70px] rounded-full"
          src={data?.senderPhotoURL}
          alt=""
        />
      </div>

      <div className="w-[80%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {data.senderName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {moment(new Date(data.date), "YYYYMMDD").fromNow()}
        </p>
      </div>

      <button
        onClick={() => handleAccept(data)}
        className=" font-poppins font-semibold p-2 text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[12px]"
      >
        <FaCheck />
      </button>
      <button
        onClick={() => handleReject(data)}
        className=" font-poppins font-semibold p-2 text-[20px] text-white bg-red-500 rounded-[5px] px-[8px] me-[12px]"
      >
        <FaTimes />
      </button>
    </Flex>
  );
};

export default FriendAccept;
