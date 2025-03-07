import { Link, useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { IoMdAdd, IoMdSearch } from "react-icons/io";

const NavBar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 mb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          className="p-2 w-full bg-white outline-none"
          onFocus={() => navigate("/search")}
        />
      </div>

      {user && (
        <div className="flex gap-3">
          <Link to={`/user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="User photo" className="w-14 h-12 rounded-lg" />
          </Link>
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div>
      )}
    </div>
  );
};

NavBar.propTypes = {
  searchTerm: propTypes.string,
  setSearchTerm: propTypes.func,
  user: propTypes.object,
};

export default NavBar;
