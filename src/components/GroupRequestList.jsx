import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ChatAccept from "./ChatAccept";
import SearchSection from "./common/SearchSection";

const GroupRequestList = () => {
  return (
    <div>
      <SearchSection />

      <div className="px-[23px] py-[13px] mt-[43px] shadow-custom rounded-[20px]">
        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            Groups Request
          </h2>
          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <div className="h-[300px] overflow-y-scroll">
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
