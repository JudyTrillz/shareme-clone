import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";

import { RiHomeFill } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";

import logo from "../assets/logo.png";

import { categories } from "../util/data";

const isNotActiveStyles =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black hover:font-extrabold transition-all duration-200 ease-in-out capitalize";

const isActiveStyles =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const SideBar = ({ user, closeToggle }) => {
  const handleCloseSideBar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar shadow-lg">
      <div className="flex flex-col">
        <Link
          to={"/"}
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSideBar}>
          <img src={logo} alt="logo" loading="eager" className="w-full" />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            onClick={handleCloseSideBar}>
            <RiHomeFill />
            Home
          </NavLink>

          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>

          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyles : isNotActiveStyles
              }
              onClick={handleCloseSideBar}>
              <img
                src={category.image}
                alt="category image"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>

      {user && (
        <Link
          to={`/user-profile/${user._id}`}
          className="flex items-center my-5 mb-3 gap-2 p-2 bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSideBar}>
          <img src={user.image} alt="user Image" className="w-10 h-10 rounded-full" />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

SideBar.propTypes = {
  user: PropTypes.object,
  closeToggle: PropTypes.func,
};

export default SideBar;
