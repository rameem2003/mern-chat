import React from "react";
import Flex from "./common/Flex";
import moment from "moment";

const AddUser = ({ user }) => {
  return (
    <Flex className=" items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full object-cover"
          src={user.photoURL}
          alt={"wem"}
        />
      </div>

      <div className="w-[75%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {user.displayName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {moment(new Date(user.create), "YYYYMMDD").fromNow()}
        </p>
      </div>

      <button className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[27px]">
        +
      </button>
    </Flex>
  );
};

export default AddUser;
