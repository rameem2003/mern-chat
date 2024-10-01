import React, { useEffect, useState } from "react";
import Flex from "./common/Flex";
import { useDispatch, useSelector } from "react-redux";
import { onValue, push, ref, remove, set, update } from "firebase/database";
import { db } from "../config/firebase.config";
import { IoPersonRemoveOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { ChatReducer } from "../redux/featurea/ChatSlice";

const Chat = ({ data }) => {
  // user data
  const dispatch = useDispatch();
  const me = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  const location = useLocation();

  const [masseges, setMasseges] = useState([]);

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

  const handleChat = () => {
    if (me.uid == data.senderUid) {
      dispatch(
        ChatReducer({
          name: data.receiverName,
          uid: data.receiverUid,
          photoURL: data.receiverPhotoURL,
        })
      );
    } else {
      dispatch(
        ChatReducer({
          name: data.senderName,
          uid: data.senderUid,
          photoURL: data.senderPhotoURL,
        })
      );
    }
  };

  useEffect(() => {
    const starCountRef = ref(db, "chat/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (
          chatData.uid == user.val().senderid ||
          chatData.uid == user.val().receiverid
        ) {
          arr.push({ ...user.val(), uid: user.key });
        }
      });
      setMasseges(arr);
    });
  }, [chatData && chatData.uid]);

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
        {location.pathname == "/chat" ? (
          <button
            onClick={handleChat}
            className=" font-poppins font-semibold text-[20px] p-2 text-white bg-primary rounded-[5px] px-[8px] "
          >
            <BsArrowRight />
          </button>
        ) : (
          <button
            onClick={() => handleblocked(data)}
            className=" font-poppins font-semibold text-[20px] p-2 text-white bg-red-500 rounded-[5px] px-[8px] "
          >
            <IoPersonRemoveOutline />
          </button>
        )}
      </div>
    </Flex>
  );
};

export default Chat;
