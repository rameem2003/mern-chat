import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchSection = () => {
  return (
    <div className="flex items-center justify-between px-[23px] py-[20px] rounded-[20px] shadow-custom">
      <FaMagnifyingGlass size={20} />
      <input
        className="ps-[36px] w-full outline-none font-poppins placeholder:font-poppins placeholder:font-medium placeholder:text-[16px]"
        type="text"
        name=""
        id=""
        placeholder="Search"
      />

      <BsThreeDotsVertical size={20} className="text-secondary" />
    </div>
  );
};

export default SearchSection;
