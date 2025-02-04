import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../util/data";

const CreatePin = ({ user }) => {
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState(null);
  const [about, setAbout] = useState("");
  const [fields, setFields] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const upLoadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/jpeg" ||
      type === "image/png" ||
      type === "image/svg+xml" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setLoading(true);
      setWrongImageType(false);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((res) => {
          setImageAsset(res);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (
      title &&
      destination &&
      category &&
      about &&
      imageAsset?._id &&
      user?._id
    ) {
      const pin = {
        _type: "pin",
        title,
        destination: destination.startsWith("http")
          ? destination
          : `https://${destination}`,
        about,
        category:
          typeof category === "object"
            ? category?.name || category?.value
            : category,
        image: {
          _type: "image",
          asset: {
            _ref: imageAsset?._id,
            _type: "reference",
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
      };

      client.create(pin).then(() => {
        navigate("/");
      });
    } else {
      return;
    }
  };

  return (
    <div className="flex fleX-col items-center justify-center mt-5 lg:h-4/5">
      {fields && (
        <p className="text-red-500 font-bold capitalize mb-5 text-xl transition-all duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}

      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex items-center justify-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner message="Preparing your image" />}
            {wrongImageType && <p className="">Wrong image type</p>}
            {!imageAsset ? (
              !loading && (
                <label>
                  <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-bold text-2xl">
                        <AiOutlineCloudUpload />
                      </p>
                      <p className="text-lg"> Click to upload</p>
                    </div>
                    <p className="mt-14 lg:mt-32 text-gray-400 text-center">
                      Use high quality images (JPG, PNG, SVG, GIF) less than 20
                      Mb
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={upLoadImage}
                    className="w-0 h-0"
                  />
                </label>
              )
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="Upload pic"
                  className="w-full h-full object-cover"
                />

                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}>
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt="profile photo"
                className="w-10 h-10 rounded-full object-contain"
              />

              <p className="font-bold">{user.userName}</p>
            </div>
          )}

          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="What is your pin about"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Add a destination link"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />

          <div className="flex flex-col">
            <div className="">
              <p className="mb-2 font-semibold text-lg sm:text-xl">
                Choose a category
              </p>

              <select
                onChange={(e) => setCategory(e.target.value)}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 rounded-md p-2 cursor-pointer">
                <option value="Other" className="bg-white">
                  Select category
                </option>

                {categories.map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                    className="text-base border-0 outline-none capitalize bg-white text-black">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-start items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CreatePin.propTypes = {
  user: propTypes.object,
};

export default CreatePin;
