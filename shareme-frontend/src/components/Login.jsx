import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logowhite.png";
import loginVideo from "../assets/share.mp4";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        const data = await fetch(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${res.access_token}`,
            },
          }
        );
        if (data.ok) {
          const userInfo = await data.json();
          const { id, name, picture } = userInfo;
          localStorage.setItem("user", JSON.stringify(userInfo));

          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: picture,
          };

          client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
          });
        } else {
          throw new Error("Failed to create new user, Something wet wrong");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  return (
    <main className="">
      <div className="relative w-screen h-screen flex items-center justify-center">
        <video
          src={loginVideo}
          type="video/mp4"
          className="w-full h-full object-cover"
          controls={false}
          loop
          autoPlay
          muted
        />

        <div className="flex flex-col items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" loading="eager" className="w-40" />
          </div>

          <button
            className="shadow-2xl bg-mainColor flex items-center justify-center p-3 rounded-lg gap-2  cursor-pointer font-bold outline-none "
            onClick={() => login()}>
            <FcGoogle /> Sign In with Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
