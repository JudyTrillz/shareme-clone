import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";

import { client } from "../client";
import { userQuery } from "../util/data";
import logo from "../assets/logo.png";
import { fetchUser } from "../util/fetchUser";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.id);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* Desktop sideBar */}
      <aside className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </aside>

      {/* Mobile nav with sideBar */}
      <nav className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between  items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />

          <Link to={"/"}>
            <img src={logo} alt="logo" loading="eager" className="w-28" />
          </Link>

          <Link to={`/user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="userLogo"
              loading="eager"
              className="w-28"
            />
          </Link>
        </div>

        {toggleSideBar && (
          <aside className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute top-5 right-5 w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSideBar} />
          </aside>
        )}
      </nav>

      <section
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </section>
    </main>
  );
};

export default Home;
