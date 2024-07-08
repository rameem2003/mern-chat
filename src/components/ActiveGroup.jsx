import React from "react";

const ActiveGroup = () => {
  return (
    <div className=" flex items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[70px] h-[70px] rounded-full"
          src="/fdrlogo.jpg"
          alt=""
        />
      </div>

      <div className="w-[80%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          FDR 2309
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Hi Guys, Wassup!
        </p>
      </div>
    </div>
  );
};

export default ActiveGroup;
