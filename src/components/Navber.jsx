import React from "react";
import {
  IoHomeOutline,
  IoChatbubbleEllipses,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { Link } from "react-router-dom";

const Navber = () => {
  return (
    <nav className="bg-secondary h-full flex items-center flex-col rounded-[20px]">
      <img
        className="mt-[24px] h-[100px] w-[100px] rounded-full object-cover"
        src="/profile.jpg"
        alt=""
      />

      <ul className="mt-[78px] ps-[18px]">
        <li>
          <Link
            to="/"
            className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
          >
            <IoHomeOutline />
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
            href="#"
          >
            <IoChatbubbleEllipses />
          </Link>
        </li>
        <li>
          <a
            className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
            href="#"
          >
            <FaRegBell />
          </a>
        </li>
        <li>
          <Link
            to="/setting"
            className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
            href="#"
          >
            <IoSettingsOutline />
          </Link>
        </li>
        <li className="mt-[116px]">
          <a
            className="relative inline-block text-white text-[46px] ps-[40px] pe-[50px] py-[20px] rounded-s-[20px] after:absolute after:h-full after:w-[8px] after:top-0 after:right-0 after:rounded-s-[20px] hover:text-secondary hover:bg-white hover:after:bg-secondary"
            href="#"
          >
            <GrLogout />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navber;
