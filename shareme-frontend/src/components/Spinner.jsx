import { Circles } from "react-loader-spinner";
import PropTypes from "prop-types";

export const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full ">
      <Circles
        type="circles"
        color="#00BFFF"
        height={50}
        width={200}
        wrapperClass="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};
Spinner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Spinner;
