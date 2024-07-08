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

      <FriendAccept />
      <FriendAccept />
      <FriendAccept />
    </div>
  );
};

export default FriendRequestList;
