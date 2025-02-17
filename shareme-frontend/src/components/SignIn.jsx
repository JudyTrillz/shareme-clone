import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const SignIn = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-center mt-7  ">
      <button
        type="button"
        className="flex gap-3 bg-red-500 p-3 rounded-full text-white font-bold shadow-lg hover:shadow-none transition-all duration-500 ease-in-out"
        onClick={() => navigate("/login")}>
        <FaSignInAlt size={24} />

        <p>{message}</p>
      </button>
    </div>
  );
};

SignIn.propTypes = {
  message: PropTypes.string,
};

export default SignIn;
