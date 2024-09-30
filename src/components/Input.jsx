import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsCamera } from "react-icons/bs";
import { useSelector } from "react-redux";
import { push, ref, set } from "firebase/database";
import { db } from "../config/firebase.config";
import EmojiPicker from "emoji-picker-react";

const Input = () => {
  const me = useSelector((state) => state.user.user);
  const chatData = useSelector((state) => state.chat.chat);
  const [text, setText] = useState("");
  const [picker, setPicker] = useState(false);
  const [emoji, setemoji] = useState("");

  const handleSend = () => {
    set(push(ref(db, "chat/")), {
      senderid: me.uid,
      senderName: me.displayName,
      senderPhoto: me.photoURL,
      receiverid: chatData.uid,
      receiverName: chatData.name,
      receiverPhoto: chatData.photoURL,
      date: Date.now(),
      text,
    }).then(() => setText(""));
  };

  const handleEmoji = (e) => {
    setText((prevText) => prevText + e.emoji);
  };
  return (
    <div className=" flex items-center justify-between pt-[35px]">
      <div className="w-[93%] relative">
        <input
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="w-full h-[45px] rounded-[10px] bg-customGrey px-5"
          type="text"
          placeholder="Write your massage......"
          name=""
          id=""
        />
        <CgSmileMouthOpen
          onClick={() => setPicker(!picker)}
          size={22}
          className=" absolute top-[11px] right-[46px] text-emojiGrey cursor-pointer"
        />
        <BsCamera
          size={22}
          className=" absolute top-[11px] right-[12px] text-emojiGrey"
        />

        {picker && (
          <div className=" absolute top-[-500px] right-0">
            <EmojiPicker onEmojiClick={handleEmoji} />
          </div>
        )}
      </div>
      <button
        onClick={handleSend}
        className=" flex items-center justify-center w-[45px] h-[45px] rounded-[10px] bg-secondary text-white"
      >
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default Input;
