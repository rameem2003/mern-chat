import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chat from "./Chat";
import ActiveChat from "./ActiveChat";

const ChatPageFriendSection = () => {
  return (
    <div>
      <div className="mt-[41px] px-[23px] py-[13px] h-[318px] shadow-custom rounded-[20px]">
        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            Friends
          </h2>
          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <ActiveChat />
        <ActiveChat />
        <ActiveChat />
      </div>
    </div>
  );
};

export default ChatPageFriendSection;
