import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Masseges from "./Masseges";
import Input from "./Input";
import { useSelector } from "react-redux";

const ChatBody = () => {
  const me = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  return (
    <div className="px-[51px] pt-[24px] pb-[34px] shadow-custom rounded-[20px] h-[810px]">
      <div
        className="h-[10%] flex items-center justify-between pb-[24px] border-b-[1px] border-gray-300
      "
      >
        <div className="flex items-center gap-[33px]">
          <img
            className="w-[75px] h-[75px] rounded-full"
            src={chatData?.photoURL}
            alt=""
          />

          <div>
            <h2 className=" font-poppins font-semibold text-[24px]">
              {chatData?.name}
            </h2>
            <p className="font-poppins font-normal text-[14px]">Online</p>
          </div>
        </div>

        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <Masseges />
      <Input />
    </div>
  );
};

export default ChatBody;
