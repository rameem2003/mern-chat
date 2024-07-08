import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatAccept from "./ChatAccept";
import ActiveGroup from "./ActiveGroup";

const ChatPageGroupSection = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between px-[23px] py-[20px] rounded-[20px] shadow-custom">
          <FaMagnifyingGlass size={20} />
          <input
            className="ps-[36px] w-full outline-none font-poppins placeholder:font-poppins placeholder:font-medium placeholder:text-[16px]"
            type="text"
            name=""
            id=""
            placeholder="Search"
          />

          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <div className="px-[23px] py-[13px] mt-[43px] shadow-custom rounded-[20px]">
          <div className="flex items-center justify-between">
            <h2 className=" font-poppins font-semibold text-[20px] text-black">
              Groups
            </h2>
            <BsThreeDotsVertical size={20} className="text-secondary" />
          </div>

          <ActiveGroup />
          <ActiveGroup />
          <ActiveGroup />
        </div>
      </div>
    </div>
  );
};

export default ChatPageGroupSection;
