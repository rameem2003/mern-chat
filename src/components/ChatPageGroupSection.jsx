import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import ActiveGroup from "./ActiveGroup";
import SearchSection from "./common/SearchSection";

const ChatPageGroupSection = () => {
  return (
    <div>
      <div>
        <SearchSection />

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
