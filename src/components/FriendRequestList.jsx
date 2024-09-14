import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import FriendAccept from "./FriendAccept";
import { useSelector } from "react-redux";
import { db } from "../config/firebase.config";
import { onValue, ref } from "firebase/database";

const FriendRequestList = () => {
  // user data
  const data = useSelector((state) => state.user.user);

  // all users data
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (data.uid == user.val().receiverUid) {
          arr.push({ ...user.val(), key: user.key });
        }
      });
      setRequestList(arr);
    });
  }, []);
  return (
    <div className="px-[23px] shadow-custom rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-poppins font-semibold text-[20px] text-black">
          Friend Request
        </h2>
        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <div className=" h-[250px] overflow-y-scroll no-scrollbar">
        {requestList.map((data, i) => (
          <FriendAccept data={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FriendRequestList;
