import React from "react";
import Flex from "./common/Flex";
import { useSelector } from "react-redux";
import { MdDoNotDisturbOn } from "react-icons/md";
import { push, ref, remove, set, update } from "firebase/database";
import { db } from "../config/firebase.config";
import { IoPersonRemoveOutline } from "react-icons/io5";

const Chat = ({ data }) => {
  // user data
  const me = useSelector((state) => state.user.user);

  const handleblocked = async (info) => {
    update(ref(db, "frinedList/" + info.key), {
      notblock: false,
    });

    if (me.uid == data.senderUid) {
      set(push(ref(db, "blocklist/")), {
        blockbyid: me.uid,
        blockbyname: me.displayName,
        blockbyphotoURL: me.photoURL,
        blockuserid: data.receiverUid,
        blockusername: data.receiverName,
        blockuserphotoURL: data.receiverPhotoURL,
        mutualfriendlistID: data.key,
      }).then(() => {
        // remove(ref(db, "frinedList/" + data.key));
      });
    } else {
      set(push(ref(db, "blocklist/")), {
        blockbyid: me.uid,
        blockbyname: me.displayName,
        blockbyphotoURL: me.photoURL,
        blockuserid: data.senderUid,
        blockusername: data.senderName,
        blockuserphotoURL: data.senderPhotoURL,
        mutualfriendlistID: data.key,
      }).then(() => {
        // remove(ref(db, "frinedList/" + data.key));
      });
    }
  };
  return (
    <Flex className=" items-start justify-between py-[13px] gap-1 border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full"
          src={
            me?.uid == data?.senderUid
              ? data?.receiverPhotoURL
              : data?.senderPhotoURL
          }
          alt=""
        />
      </div>

      <div className="w-[70%] ms-[0px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {me?.uid == data?.senderUid ? data?.receiverName : data?.senderName}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          Sir?
        </p>
      </div>

      <div>
        {/* <span className=" font-poppins font-medium text-[10px] text-textSecondary">
          Today, 8:56pm
        </span> */}

        <button
          onClick={() => handleblocked(data)}
          className=" font-poppins font-semibold text-[20px] p-2 text-white bg-red-500 rounded-[5px] px-[8px] "
        >
          <IoPersonRemoveOutline />
        </button>
      </div>
    </Flex>
  );
};

export default Chat;
