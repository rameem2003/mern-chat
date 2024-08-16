import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FriendAccept from "./FriendAccept";

const FriendRequestList = () => {
  return (
    <div className="px-[23px] shadow-custom rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-poppins font-semibold text-[20px] text-black">
          Friend Request
        </h2>
        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <div className=" h-[250px] overflow-y-scroll">
        <FriendAccept />
        <FriendAccept />
        <FriendAccept />
        <FriendAccept />
        <FriendAccept />
      </div>
    </div>
  );
};

export default FriendRequestList;
