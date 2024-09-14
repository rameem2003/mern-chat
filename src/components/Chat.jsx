import React from "react";
import Flex from "./common/Flex";
import { useSelector } from "react-redux";

const Chat = ({ data }) => {
  // user data
  const me = useSelector((state) => state.user.user);
  return (
    <Flex className=" items-start justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full"
          src={
            me.uid == data?.senderUid
              ? data?.receiverPhotoURL
              : data?.senderPhotoURL
          }
          alt=""
        />
      </div>

      <div className="w-[70%] ms-[0px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {me.uid == data?.senderUid ? data?.receiverName : data?.senderName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Sir?
        </p>
      </div>

      <span className=" font-poppins font-medium text-[10px] text-textSecondary">
        Today, 8:56pm
      </span>
    </Flex>
  );
};

export default Chat;
