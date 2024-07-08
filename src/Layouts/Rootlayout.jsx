import React from "react";

import { Outlet } from "react-router-dom";
import Navigation from "../components/shared/Navigation";

const Rootlayout = () => {
  return (
    <div className="h-screen flex px-[35px] py-[49px]">
      <div className="w-1/12">
        <Navigation />
      </div>

      <div className="w-11/12 ps-[40px] pe-[23px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Rootlayout;
