import React from "react";

const Chat = () => {
  return (
    <div className=" flex items-start justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full"
          src="/chatlogo.jpg"
          alt=""
        />
      </div>

      <div className="w-[70%] ms-[0px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          MH Rameem
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Sir?
        </p>
      </div>

      <span className=" font-poppins font-medium text-[10px] text-textSecondary">
        Today, 8:56pm
      </span>
    </div>
  );
};

export default Chat;
