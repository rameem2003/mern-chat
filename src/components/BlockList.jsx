import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import BlockUser from "./BlockUser";
import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase.config";
import { useSelector } from "react-redux";

const BlockList = () => {
  const data = useSelector((state) => state.user.user);

  // all users data
  const [blockList, setBLockList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "blocklist/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (data.uid == user.val().blockbyid) {
          // arr.push({ ...user.val(), key: user.key });

          arr.push({
            key: user.key,
            blockuser: user.val().blockusername,
            blockuserid: user.val().blockuserid,
            blockuserhotoURL: user.val().blockuserphotoURL,
            mutualfriendlistID: user.val().mutualfriendlistID,
          });
        } else if (data.uid == user.val().blockuserid) {
          arr.push({
            key: user.key,
            blockby: user.val().blockbyname,
            blockbyid: user.val().blockbyid,
            blockbyphotoURL: user.val().blockbyphotoURL,
            mutualfriendlistID: user.val().mutualfriendlistID,
          });
        }
      });
      setBLockList(arr);
    });
  }, []);

  return (
    <div className="px-[23px] shadow-custom rounded-[20px]">
      <div className="flex items-center justify-between">
        <h2 className=" font-poppins font-semibold text-[20px] text-black">
          Blocked Users
        </h2>
        <BsThreeDotsVertical size={20} className="text-secondary" />
      </div>

      <div className=" h-[250px] overflow-y-scroll no-scrollbar">
        {blockList.map((data, i) => (
          <BlockUser data={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default BlockList;
