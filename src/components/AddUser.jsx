import React from "react";

const AddUser = ({ user }) => {
  return (
    <div className=" flex items-center justify-between py-[13px] border-b-[1px] border-gray-300">
      <div>
        <img
          className="w-[52px] h-[52px] rounded-full object-cover"
          src={user.photo}
          alt={user.username}
        />
      </div>

      <div className="w-[75%] ms-[14px]">
        <h2 className=" font-poppins font-semibold text-[18px] text-black">
          {user.username}
        </h2>
        <p className=" font-poppins font-medium text-[14px] text-textSecondary">
          {user.email}
        </p>
      </div>

      <button className=" font-poppins font-semibold text-[20px] text-white bg-secondary rounded-[5px] px-[8px] me-[27px]">
        +
      </button>
    </div>
  );
};

export default AddUser;
