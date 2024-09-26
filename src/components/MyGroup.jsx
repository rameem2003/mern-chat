import React from "react";
import Flex from "./common/Flex";
import moment from "moment";
import { FaTrash } from "react-icons/fa6";
import { ref, remove } from "firebase/database";
import { db } from "../config/firebase.config";

const MyGroup = ({ data }) => {
  const handleblocked = () => {
    remove(ref(db, "groupList/" + data.key));
  };
  return (
    <Flex className=" items-start justify-between py-[13px] gap-1 border-b-[1px] border-gray-300">
      <div>
        <div className="w-[52px] h-[52px] rounded-full bg-secondary flex items-center justify-center">
          <p className=" font-bold text-xl text-white">
            {data.groupName.slice(0, 1)}
          </p>
        </div>
      </div>

      <div className="w-[70%] ms-[0px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {data.groupName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {moment(new Date(data.date), "YYYYMMDD").fromNow()}
        </p>
      </div>

      <div>
        <button
          onClick={handleblocked}
          className=" font-poppins font-semibold text-[20px] p-2 text-white bg-red-500 rounded-[5px] px-[8px] "
        >
          <FaTrash />
        </button>
      </div>
    </Flex>
  );
};

export default MyGroup;
