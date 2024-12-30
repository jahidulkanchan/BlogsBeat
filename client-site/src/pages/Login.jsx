import { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import loginImg from '../assets/login.png'
import { motion } from "motion/react"

const Login = () => {
  const {signWithGoogle,signInUser,setUser} = useAuth()
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const emailRef = useRef()
   // Sign up with google ====================
   const handleSignGoogle = () => {
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          setUser(user);
          navigate('/')
        }
      })
      .catch((error) => console.log(error.message));
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage("");
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          setUser(user);
          e.target.reset();
          navigate('/')
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };
  return (
    <>
       <section className={`container px-2 mx-auto pb-10 pt-[100px] md:pt-[130px] min-h-[600px]`}>
        <h2 className="text-3xl text-center font-semibold md:mb-5">
        <span>Log In to </span>
          <span 
           style={{
            textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
          }}
          className="text-secondary">
            Your Account
          </span>
        </h2>
        <div className="grid items-center grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <motion.p 
             animate={{ scale: [0.9,0.85, 0.9] }} 
             transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
             ><img src={loginImg} alt="" /></motion.p>
          </div>
           <form
          onSubmit={handleSignIn}
          className={`col-span-12 md:col-span-7 w-full md:w-10/12 py-10 flex flex-col justify-center items-center border shadow-md mx-auto min-h-[350px]`}
        >
          <div className="grid gap-5 mx-5 grid-cols-1">
            <div>
              <label className=" mb-2 font-semibold" htmlFor="email">
                Email Address:
              </label>
              <input
                className="p-2 w-full bg-slate-100 border outline-none"
                type="email"
                placeholder="Your Email"
                name="email"
                ref={emailRef}
              />
            </div>
            <div>
              <label className=" mb-2 font-semibold" htmlFor="password">
                Password:
              </label>
              <div className="relative">
                <input
                  className="p-2 w-full bg-slate-100 border outline-none"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
            </div>
          </div>
          <div>
            <button className="bg-secondary text-white duration-150 w-11/12 block mx-auto font-semibold px-5 py-3 mt-8 ">
              Log In
            </button>
            {errorMessage && (
              <p className="text-red-500 mt-2">
                Something is wrong! <br /> please use correct email or password
              </p>
            )}
            <p className="mt-5 text-center text-slate-500">
              If you have not an account please{" "}
              <Link to="/register" className="text-secondary">
                Register
              </Link>
            </p>
            <div
              onClick={handleSignGoogle}
              className="flex text-secondary border w-fit  mx-auto px-5 py-2 shadow cursor-pointer border-secondary justify-center items-center gap-2 my-5"
            >
              <FaGoogle />
              <p>Sign With Google</p>
            </div>
          </div>
        </form>
        </div>
      </section>
    </>
  );
};

export default Login;