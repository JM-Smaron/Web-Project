import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const MySwal = withReactContent(Swal);

const Login = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const { signIn, setUser, googleSignin } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    googleSignin()
      .then((res) => {
        MySwal.fire({
          title: "Login Successful",
          text: "You have logged in successfully.",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 500);
      })
      .catch((err) => {
        MySwal.fire({
          title: "Login Failed",
          text: `Error: ${err.message}`,
          icon: "error",
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((res) => {
        setUser(res.user);
        MySwal.fire({
          title: "Login Successful",
          text: "You have logged in successfully.",
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate(location?.state ? location.state : "/");
        }, 800);
      })
      .catch((err) => {
        MySwal.fire({
          title: "Login Failed",
          text: `Error: ${err.message}`,
          icon: "error",
        });
      });
  };

  return (
    <div className="flex flex-col justify-center items-center py-12">
      <div className="md:flex w-full gap-12">
        <div className="w-1/2 justify-end md:flex items-center hidden ">
          <DotLottieReact
            src={
              "https://lottie.host/3a441e2f-69c5-4ece-a230-35a36c98383e/KlzZq7oCvm.lottie"
            }
            loop
            autoplay
            speed={1}
            style={{ width: "300px", height: "300px" }}
          />
        </div>

        <div className="md:w-1/2">
          <div className="mt-5 flex justify-center w-1/2 py-4">
            <h1 className="text-2xl font-bold dark:text-white">Sign in</h1>
          </div>

          <div className="card bg-base-100 dark:bg-transparent dark:border w-full max-w-md shrink-0 shadow-xl">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text dark:text-white">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text dark:text-white">Password</span>
                </label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered pr-10"
                  name="password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-2 top-12 text-xl"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>

              <div className="form-control mt-6">
                <button
                  onClick={handleGoogleLogin}
                  className="btn flex items-center text-lg"
                >
                  <FaGoogle /> Login with Google
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 underline">
                Register now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
