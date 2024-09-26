import { onValue, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import Flex from "./Flex";
import Image from "./Image";
import moment from "moment";
import { useSelector } from "react-redux";
import { db } from "../../config/firebase.config";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchSection = () => {
  // user data
  const data = useSelector((state) => state.user.user);

  // all users data
  const [users, setUsers] = useState([]);
  const [searchRef, setSearchRef] = useState(false);
  const [filterResult, setFilterResult] = useState([]); // state for storing the products after searching
  const searchResultRef = useRef();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((user) => {
        if (data.uid != user.key) {
          arr.push({ ...user.val(), uid: user.key });
        }
      });
      setUsers(arr);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      searchResultRef.current.contains(e.target)
        ? setSearchRef(true)
        : setSearchRef(false);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.target.value == "") {
      setFilterResult([]);
    } else {
      const searchResult = users.filter((searchItem) =>
        searchItem.displayName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setFilterResult(searchResult); // state for store the search result
    }
  };
  return (
    <div
      ref={searchResultRef}
      className="flex items-center justify-between px-[23px] py-[20px] rounded-[20px] shadow-custom relative"
    >
      <FaMagnifyingGlass size={20} />
      <input
        onChange={handleSearch}
        className="ps-[36px] w-full outline-none font-poppins placeholder:font-poppins placeholder:font-medium placeholder:text-[16px]"
        type="text"
        name=""
        id=""
        placeholder="Search Friends........."
      />

      <BsThreeDotsVertical size={20} className="text-secondary" />

      {searchRef && (
        <div className="w-full max-h-[300px] overflow-y-scroll bg-white fixed md:absolute top-[140px] md:top-[70px] left-0 z-[100] shadow-custom">
          {filterResult.length > 0 ? (
            filterResult.map((filterItem, i) => (
              <Flex
                key={i}
                className={`p-2 mb-2 bg-white items-center justify-between hover:bg-gray-200`}
              >
                <Flex className={`items-center gap-4`}>
                  <Image
                    src={filterItem.photoURL}
                    alt={""}
                    className={`w-[50px] h-[50px] object-cover rounded-full`}
                  />
                  <div>
                    <h2 className="font-semibold text-xl">
                      {filterItem.displayName}
                    </h2>

                    <h3 className="font-normal text-sm mt-1">
                      {moment(
                        new Date(filterItem.create),
                        "YYYYMMDD"
                      ).fromNow()}
                    </h3>
                  </div>
                </Flex>

                {/* <Link
                  to={`/product/${filterItem.id}`}
                  className=" px-4 py-2 bg-slate-800 text-white font-normal text-sm mr-2"
                >
                  View
                </Link> */}
              </Flex>
            ))
          ) : (
            <h1 className=" font-dm font-semibold text-xl text-center mt-2">
              No Friends Found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
