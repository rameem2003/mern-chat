import React from "react";

const Masseges = () => {
  return (
    <div className="pt-[30px] h-[80%] border-b-[1px] border-gray-300 overflow-y-scroll no-scrollbar">
      <div className="flex  items-start flex-col mt-[29px] relative ml-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-customGrey rounded-[20px] font-poppins font-medium text-[16px]">
            Hi Sir
          </p>
          <p className="font-poppins font-medium text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>

        <img
          className=" absolute bottom-[19px] left-[-5px] z-50"
          src="./cornarwhite.png"
          alt="cornarwhite"
        />
      </div>

      <div className="flex  items-start flex-col mt-[29px] relative ml-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-customGrey rounded-[20px] font-poppins font-medium text-[16px]">
            How are you doing?
          </p>
          <p className="font-poppins font-medium text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>
        <img
          className=" absolute bottom-[19px] left-[-5px] z-50"
          src="./cornarwhite.png"
          alt="cornarwhite"
        />
      </div>

      <div className="flex items-start flex-row-reverse mt-[29px] relative mr-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-secondary text-white rounded-[10px] font-poppins font-medium text-[16px]">
            Hello
          </p>
          <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>

        <img
          className=" absolute bottom-[18px] right-[-5px] z-50"
          src="./cornerpurple.png"
          alt="cornerpurple"
        />
      </div>

      <div className="flex items-start flex-row-reverse mt-[29px] relative mr-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-secondary text-white rounded-[10px] font-poppins font-medium text-[16px]">
            I am good and how about you?
          </p>
          <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>

        <img
          className=" absolute bottom-[18px] right-[-5px] z-50"
          src="./cornerpurple.png"
          alt="cornerpurple"
        />
      </div>

      <div className="flex  items-start flex-col mt-[29px]  relative ml-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-customGrey rounded-[20px] font-poppins font-medium text-[16px]">
            I am doing well. Can we meet up tomorrow?
          </p>
          <p className="font-poppins font-medium text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>

        <img
          className=" absolute bottom-[19px] left-[-5px] z-50"
          src="./cornarwhite.png"
          alt="cornarwhite"
        />
      </div>

      <div className="flex items-start flex-row-reverse mt-[29px] relative mr-2">
        <div>
          <p className="pt-[13px] pb-[20px] ps-[63px] pe-[52px] bg-secondary text-white rounded-[10px] font-poppins font-medium text-[16px]">
            Sure.
          </p>
          <p className="font-poppins font-medium text-right text-[12px] text-textDeem">
            Today, 2:01pm
          </p>
        </div>

        <img
          className=" absolute bottom-[18px] right-[-5px] z-50"
          src="./cornerpurple.png"
          alt="cornerpurple"
        />
      </div>
    </div>
  );
};

export default Masseges;
