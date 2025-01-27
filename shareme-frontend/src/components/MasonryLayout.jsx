import Masonry from "react-masonry-css";
import Pin from "./Pin";
import PropTypes from "prop-types";

const masonryBreakpoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry
      className="flex animate-slide-fwd"
      breakpointCols={masonryBreakpoints}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

MasonryLayout.propTypes = {
  pins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MasonryLayout;
