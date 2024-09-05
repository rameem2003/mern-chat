import React from "react";
import Flex from "./Flex";
import { Puff } from "react-loader-spinner";

const LoadingAnimation = () => {
  return (
    <Flex className="fixed top-0 left-0 w-full h-screen z-[100] bg-secondary/90 backdrop-blur-sm flex-col gap-5 items-center justify-center">
      <Puff
        visible={true}
        height="200"
        width="200"
        color="#fff"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

      <h1 className=" font-bold text-5xl text-white">Please Wait ....</h1>
    </Flex>
  );
};

export default LoadingAnimation;
