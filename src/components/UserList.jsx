import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddUser from "./AddUser";
import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase.config";
import { useSelector } from "react-redux";

const UserList = () => {
  // user data
  const data = useSelector((state) => state.user.user);

  // all users data
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (data.uid != user.key) {
          arr.push({ ...user.val(), uid: user.key });
        }
      });
      setUsers(arr);
    });
  }, []);

  return (
    <div>
      <div className="px-[23px] py-[13px] ms-[22px] shadow-custom rounded-[20px]">
        <div className="flex items-center justify-between">
          <h2 className=" font-poppins font-semibold text-[20px] text-black">
            User List
          </h2>
          <BsThreeDotsVertical size={20} className="text-secondary" />
        </div>

        <div className="h-[400px] overflow-y-scroll no-scrollbar">
          {users.map((user, i) => (
            <AddUser key={i} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
