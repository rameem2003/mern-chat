import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { CgSmileMouthOpen } from "react-icons/cg";
import { BsCamera } from "react-icons/bs";

const Input = () => {
  return (
    <div className=" flex items-center justify-between pt-[35px]">
      <div className="w-[93%] relative">
        <input
          className="w-full h-[45px] rounded-[10px] bg-customGrey"
          type="text"
          name=""
          id=""
        />
        <CgSmileMouthOpen
          size={22}
          className=" absolute top-[11px] right-[46px] text-emojiGrey"
        />
        <BsCamera
          size={22}
          className=" absolute top-[11px] right-[12px] text-emojiGrey"
        />
      </div>
      <button className=" flex items-center justify-center w-[45px] h-[45px] rounded-[10px] bg-secondary text-white">
        <FaPaperPlane />
      </button>
    </div>
  );
};

export default Input;
