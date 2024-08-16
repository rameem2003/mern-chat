import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chat from "./Chat";

const FriendsList = () => {
  return (
    <div>
      <div className="px-[23px] py-[13px] ms-[22px] shadow-custom rounded-[20px]">
        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            Friends
          </h2>
          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <div className="h-[400px] overflow-y-scroll">
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
