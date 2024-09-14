import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase.config";

const FriendsList = () => {
  // user data
  const data = useSelector((state) => state.user.user);

  // all users data
  const [friendList, setFrindList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "frinedList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (
          data.uid == user.val().senderUid ||
          data.uid == user.val().receiverUid
        ) {
          arr.push({ ...user.val(), key: user.key });
        }
      });
      setFrindList(arr);
    });
  }, []);

  return (
    <div>
      <div className="px-[23px] py-[13px] ms-[22px] shadow-custom rounded-[20px]">
        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            Friends
          </h2>
          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <div className="h-[400px] overflow-y-scroll no-scrollbar">
          {friendList.map((data, i) => (
            <Chat data={data} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
