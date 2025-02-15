import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../util/data";

import { client } from "../client";
import MasonryLayOut from "./MasonryLayout";
import Spinner from "./Spinner";
import { fetchRandomImage } from "../util/fetchPhoto";

const activeBtnStyles =
  "bg-red-500 mr-4 text-white font-bold capitalize p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary  text-black font-bold capitalize p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [banner, setBanner] = useState(null);
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    if (query) {
      client.fetch(query).then((res) => {
        setUser(res[0]);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (text === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  useEffect(() => {
    const getImage = async () => {
      setBanner(await fetchRandomImage());
    };
    getImage();
  }, []);

  if (!user) {
    return <Spinner message="Loading Profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={banner}
              className="w-full h-370 xl:h-510 shadow-lg object-cover"
              alt="banner pic"
            />

            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user image"
            />

            <h1 className="font-bold text-3xl  text-center mt-3">{user.userName}</h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    navigate("/login", { replace: true });
                  }}
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md">
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center mb-7 mt-4">
            <button
              type="button"
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}>
              created
            </button>

            <button
              type="button"
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}>
              saved
            </button>
          </div>

          {pins?.length ? (
            <div className="px-2">
              <MasonryLayOut pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
