import React from "react";

const ActiveChat = () => {
  return (
    <div className="flex items-start justify-start py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full"
          src="/chatlogo.jpg"
          alt=""
        />
      </div>

      <div className=" ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          MH Rameem
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Sir?
        </p>
      </div>
    </div>
  );
};

export default ActiveChat;
