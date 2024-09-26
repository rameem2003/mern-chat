import React from "react";
import Flex from "./common/Flex";
import moment from "moment";

const GroupChatAccept = ({ data }) => {
  return (
    <Flex className=" items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center">
          <p className=" font-bold text-xl text-white">
            {data.groupName.slice(0, 1)}
          </p>
        </div>
      </div>

      <div className="w-[80%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {data.groupName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {data.adminName} ( {moment(new Date(data.date), "YYYYMMDD").fromNow()}
          )
        </p>
      </div>

      <button className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[12px]">
        Accept
      </button>
    </Flex>
  );
};

export default GroupChatAccept;
