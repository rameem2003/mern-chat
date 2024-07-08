import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import BlockUser from "./BlockUser";

const BlockList = () => {
  return (
    <div className="px-[23px] ms-[22px] shadow-custom rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-poppins font-semibold text-[20px] text-black">
          Blocked Users
        </h2>
        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <BlockUser />
      <BlockUser />
      <BlockUser />
    </div>
  );
};

export default BlockList;
