import propTypes from "prop-types";
import { useState } from "react";

import { urlFor } from "../client";

const Pin = ({ pin: { image, postedBy, _id, destination } }) => {
  return (
    <div>
      <img
        src={urlFor(image).width(250).url()}
        alt="user-post"
        className="rounded-lg w-full"
      />
    </div>
  );
};

Pin.propTypes = {
  pin: propTypes.object.isRequired,
};

export default Pin;
