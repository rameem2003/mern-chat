import React, { useEffect, useState } from "react";
import Flex from "./common/Flex";
import moment from "moment";
import { useSelector } from "react-redux";
import { set, ref, push, onValue } from "firebase/database";
import { db } from "../config/firebase.config";
import { FaClock } from "react-icons/fa6";
import { MdDoNotDisturbOn } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const AddUser = ({ user }) => {
  // user data
  const data = useSelector((state) => state.user.user);
  const [requestList, setRequestList] = useState([]);
  const [friendList, setFrindList] = useState([]);
  const [blockList, setBLockList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        arr.push(user.val().senderUid + user.val().receiverUid);
      });
      setRequestList(arr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "frinedList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        arr.push(user.val().senderUid + user.val().receiverUid);
      });
      setFrindList(arr);
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, "blocklist/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        arr.push(user.val().blockbyid + user.val().blockuserid);
      });
      setBLockList(arr);
    });
  }, []);
  const handleFriendRequest = () => {
    set(push(ref(db, "friendRequest/")), {
      senderUid: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      senderPhotoURL: data.photoURL,
      receiverUid: user.uid,
      receiverName: user.displayName,
      receiverEmail: user.email,
      receiverPhotoURL: user.photoURL,
      date: Date.now(),
    });
  };

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

      {blockList.includes(data.uid + user.uid) ||
      blockList.includes(user.uid + data.uid) ? (
        <button className=" font-poppins font-semibold text-[20px] p-2 text-white bg-red-500 rounded-[5px] px-[8px] me-[27px]">
          <MdDoNotDisturbOn />
        </button>
      ) : friendList.includes(data.uid + user.uid) ||
        friendList.includes(user.uid + data.uid) ? (
        <button className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] p-2 px-[8px] me-[27px]">
          <FaUserFriends />
        </button>
      ) : requestList.includes(data.uid + user.uid) ||
        requestList.includes(user.uid + data.uid) ? (
        <button className=" font-poppins font-semibold p-2 text-[20px] text-white bg-secondary/40 pointer-events-none rounded-[5px] px-[8px] me-[27px]">
          <FaClock />
        </button>
      ) : (
        <button
          onClick={handleFriendRequest}
          className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[27px]"
        >
          +
        </button>
      )}
    </Flex>
  );
};

export default AddUser;
