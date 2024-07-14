import React from "react";
import SearchSection from "../components/common/SearchSection";
import Flex from "../components/common/Flex";
import Image from "./../components/common/Image";
import List from "./../components/common/List";
import ListItem from "./../components/common/ListItem";
import { RiCheckboxBlankCircleFill, RiEdit2Fill } from "react-icons/ri";
import { BsChatDotsFill } from "react-icons/bs";
import { IoImagesSharp } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { FaKey, FaTrash } from "react-icons/fa6";

const Settings = () => {
  return (
    <section className=" h-full">
      <div className="h-[10%]">
        <SearchSection />
      </div>
      <div className=" h-[90%]">
        <Flex className="gap-9 h-full">
          <div className="w-1/2 shadow-custom h-full p-[26px] rounded-[20px] relative">
            <h2 className=" font-poppins font-semibold text-[20px] text-black">
              Profile Settings
            </h2>

            <Flex className="items-center gap-[30px] pt-[49px] pb-[29px] border-b-[1px] border-gray-300">
              <Image
                className="w-[100px] h-[100px] rounded-full"
                src="/profile.jpg"
              />
              <div>
                <h2 className=" font-poppins font-semibold text-[25px] text-black">
                  Wasim Mahamod Raza
                </h2>
                <h3 className=" font-poppins font-normal text-[20px] text-black">
                  Stay home stay safe
                </h3>
              </div>
            </Flex>

            <div className="mt-[43px] px-9">
              <List>
                <ListItem>
                  <div>
                    <Flex className="items-center gap-9 mb-9">
                      <RiEdit2Fill className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Edit Profile Name.
                      </p>
                    </Flex>
                    <Flex className="items-center gap-9 mb-9">
                      <BsChatDotsFill className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Edit Profile Status Info..
                      </p>
                    </Flex>
                    <Flex className="items-center gap-9 mb-9">
                      <IoImagesSharp className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Edit Profile Photo.
                      </p>
                    </Flex>
                    <Flex className="items-center gap-9 mb-9">
                      <GoQuestion className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Help
                      </p>
                    </Flex>
                  </div>
                </ListItem>
              </List>
            </div>

            <p className=" absolute bottom-5 left-0 w-full text-center font-poppins font-normal text-[20px] text-black">
              Chat App
            </p>
          </div>

          <div className="w-1/2 shadow-custom h-full p-[26px] rounded-[20px] relative">
            <h2 className=" font-poppins font-semibold text-[20px] text-black">
              Account Settings
            </h2>

            <div className="mt-[43px] px-9">
              <List>
                <ListItem>
                  <div>
                    <Flex className="items-center gap-9 mb-9">
                      <FaKey className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Change Password
                      </p>
                    </Flex>
                    <Flex className="items-center gap-9 mb-9">
                      <RiCheckboxBlankCircleFill className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Theme.
                      </p>
                    </Flex>
                    <Flex className="items-center gap-9 mb-9">
                      <FaTrash className="text-[28px]" />

                      <p className=" font-poppins font-normal text-[20px] text-black">
                        Delete Account.
                      </p>
                    </Flex>
                  </div>
                </ListItem>
              </List>
            </div>

            <p className=" absolute bottom-5 left-0 w-full text-center font-poppins font-normal text-[20px] text-black">
              Chat App
            </p>
          </div>
        </Flex>
      </div>
    </section>
  );
};

export default Settings;
