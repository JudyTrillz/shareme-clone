import propTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";
import { fetchUser } from "../util/fetchUser";

const Pin = ({ pin: { image, postedBy, _id, destination, save } }) => {
  const [posHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();

  const alreadySaved = !!(
    save?.filter((save) => save.postedBy._id === user?.id) ?? []
  ).length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.id,
            postedBy: {
              _type: "postedBy",
              _ref: user.id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => {
          setPostHovered(true);
        }}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}>
        <img
          src={urlFor(image).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />

        {user && posHovered && (
          <div
            style={{ height: "100%" }}
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none transition-all duration-500 ease-out">
                  <MdDownloadForOffline />
                </a>
              </div>

              {alreadySaved ? (
                <button
                  className="bg-red-500  text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md  outline-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}>
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md transition-all duration-500 ease-out outline-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}>
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md transition-all duration-500 ease-out"
                  onClick={(e) => e.stopPropagation()}>
                  <BsFillArrowUpRightCircleFill />
                  <span>
                    {destination.length > 20
                      ? `${destination.slice(8, 15)} ...`
                      : destination.slice(8)}
                  </span>
                </a>
              )}

              {postedBy?._id === user?.id && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                  className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold  text-base rounded-3xl hover:shadow-md transition-all duration-500 ease-out outline-none">
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Pin.propTypes = {
  pin: propTypes.object.isRequired,
};

export default Pin;
