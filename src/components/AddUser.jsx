import React from "react";
import Flex from "./common/Flex";

const AddUser = ({ user }) => {
  return (
    <Flex className=" items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full object-cover"
          src={"/chatlogo.jpg"}
          alt={"wem"}
        />
      </div>

      <div className="w-[75%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {"Rameem"}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {"email"}
        </p>
      </div>

      <button className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[27px]">
        +
      </button>
    </Flex>
  );
};

export default AddUser;
