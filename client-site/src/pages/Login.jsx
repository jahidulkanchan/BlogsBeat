import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { signWithGoogle, signInUser, setUser } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef();

  // Sign up with google ====================
  const handleSignGoogle = () => {
    signWithGoogle()
      .then((result) => {
        const user = result.user;
        if (user) {
          setUser(user);
          navigate('/');
        }
      })
      .catch((error) => console.log(error.message));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage('');
    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          setUser(user);
          e.target.reset();
          navigate('/');
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
              textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
            }}
            className="text-secondary">
            Your Account
          </span>
        </h2>
        <div className="grid items-center grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <motion.p animate={{ scale: [0.9, 0.85, 0.9] }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
              <img src={loginImg} alt="" />
            </motion.p>
          </div>

          <form
            onSubmit={handleSignIn}
            className={`col-span-12 md:col-span-7 w-full rounded-xl md:w-10/12 py-10 flex flex-col justify-center items-center border shadow-md md:shadow-xl mx-auto min-h-[350px] dark:bg-slate-800 dark:text-white`}>
            <div className="grid gap-5 mx-5 grid-cols-1">
              <div>
                <label className="mb-2 font-medium" htmlFor="email">
                  Email Address:
                </label>
                <input
                  className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-white border outline-none"
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  ref={emailRef}
                />
              </div>
              <div>
                <label className="mb-2 font-medium" htmlFor="password">
                  Password:
                </label>
                <div className="relative">
                  <input
                    className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-white border outline-none"
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="bg-secondary rounded-md text-white duration-150 w-11/12 block mx-auto font-medium px-5 py-3 mt-8 hover:bg-secondary-dark dark:hover:bg-secondary-light">Log In</button>
              {errorMessage && (
                <p className="text-red-500 mt-2">
                  Something is wrong! <br /> Please use the correct email or password.
                </p>
              )}
              <p className="mt-5 text-center text-slate-500 dark:text-slate-400">
                If you do not have an account, please{' '}
                <Link to="/register" className="text-secondary">
                  Register
                </Link>
              </p>
              <div
                onClick={handleSignGoogle}
                className="flex text-secondary border w-fit mx-auto px-5 py-2 shadow cursor-pointer border-secondary justify-center items-center gap-2 my-5 hover:bg-secondary-light dark:hover:bg-secondary-dark">
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
