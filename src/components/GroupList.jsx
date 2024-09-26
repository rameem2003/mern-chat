import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import MyGroup from "./MyGroup";
import { useSelector } from "react-redux";
import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase.config";

const GroupList = () => {
  // user data
  const data = useSelector((state) => state.user.user);

  // all users data
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "groupList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (data.uid == user.val().adminID) {
          arr.push({ ...user.val(), key: user.key });
        }
      });
      setMyGroups(arr.sort((a, b) => b.date - a.date));
    });
  }, []);

  return (
    <div className="px-[23px] ms-[22px] shadow-custom rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-poppins font-semibold text-[20px] text-black">
          My Groups
        </h2>
        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <div className=" h-[250px] overflow-y-scroll no-scrollbar">
        {myGroups.map((data, i) => (
          <MyGroup key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default GroupList;
