import React from "react";
import Flex from "./common/Flex";
import { useSelector } from "react-redux";
import { IoSyncOutline } from "react-icons/io5";
import { ref, remove, update } from "firebase/database";
import { db } from "../config/firebase.config";

const BlockUser = ({ data }) => {
  console.log(data);

  // user data
  const me = useSelector((state) => state.user.user);

  const handleUnblock = () => {
    update(ref(db, "frinedList/" + data.mutualfriendlistID), {
      notblock: true,
    }).then(() => {
      remove(ref(db, "blocklist/" + data.key));
    });
  };

  return (
    <Flex className=" items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[70px] h-[70px] rounded-full"
          src={data.blockuserhotoURL || data.blockbyphotoURL}
          alt=""
        />
      </div>

      <div className="w-[80%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {data.blockby}
        </h2>
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {data.blockuser}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Today, 8:56pm
        </p>
      </div>

      {data.blockuserid && (
        <button
          onClick={handleUnblock}
          className=" font-poppins font-semibold text-[20px] text-white bg-red-500 rounded-[5px] p-2 px-[8px] me-[12px]"
        >
          <IoSyncOutline />
        </button>
      )}
    </Flex>
  );
};

export default BlockUser;
