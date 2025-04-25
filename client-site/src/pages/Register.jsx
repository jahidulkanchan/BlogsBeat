import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const [ishidden, setIsHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { signUpUser, updateUserProfile, setUser } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    setErrorMessage('');
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!regex.test(password)) {
      return setErrorMessage('Password must be at least 6 characters, include a capital letter, a number, and a special character.');
    }

    signUpUser(email, password)
      .then((result) => {
        toast.success('Registered successfully');
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            const updatedUser = {
              ...user,
              displayName: name,
              photoURL: photo,
            };
            setUser(updatedUser);
            navigate('/');
            window.scrollTo(0, 0);
          })
          .catch((err) => setErrorMessage(err.message));
      })
      .catch((err) => setErrorMessage(err.message));
  };

  return (
    <>
      <section className="flex container mx-auto flex-col justify-center pt-[100px] min-h-[700px] sm:min-h-[600px] items-center dark:bg-slate-800 dark:text-white">
        <h2 className="text-3xl text-center font-semibold mb-10">
          <span>Register to </span>
          <span
            style={{
              textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
            }}
            className="text-secondary">
            Get Started
          </span>
        </h2>
        <form
          onSubmit={handleSignUp}
          className="w-11/12 md:w-10/12 lg:w-8/12 py-8 flex flex-col justify-center items-center border space-y-4 shadow-md md:shadow-xl mx-auto rounded-xl mb-10 md:mb-0 min-h-[350px] dark:bg-slate-700">
          <div className="grid gap-5 mx-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 font-medium" htmlFor="name">
                Name:
              </label>
              <br />
              <input
                className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white border outline-none"
                type="text"
                placeholder="Your Name"
                name="name"
                required
              />
            </div>
            <div>
              <label className="mb-2 font-medium" htmlFor="photo">
                Photo URL:
              </label>
              <input
                className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white border outline-none"
                type="text"
                placeholder="Photo URL"
                name="photo"
                required
              />
            </div>
            <div>
              <label className="mb-2 font-medium" htmlFor="email">
                Email Address:
              </label>
              <input
                className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white border outline-none"
                type="email"
                placeholder="Your Email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="mb-2 font-medium" htmlFor="password">
                Password:
              </label>
              <div className="relative">
                <input
                  className="p-2 w-full rounded-md bg-slate-100 dark:bg-slate-600 dark:border-slate-500 dark:text-white border outline-none"
                  type={`${ishidden ? 'password' : 'text'}`}
                  placeholder="Password"
                  name="password"
                />
                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                <div onClick={() => setIsHidden(!ishidden)} className="absolute cursor-pointer right-2 top-3">
                  {ishidden ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <button className="bg-secondary rounded-md hover:shadow-lg duration-150 w-11/12 block mx-auto px-5 py-3 mt-2 text-white">Register</button>
            <p className="mt-5 text-center text-slate-500 dark:text-slate-400">
              Already have an account? Please{' '}
              <Link to="/login" className="text-secondary">
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
