import { useState } from 'react';
import { FaBarsStaggered } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const { loading } = useAuth();
  const [isShow, setIsShow] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const handleToggleUser = () => {
    setIsHidden(!isHidden);
    setIsShow(false);
  };
  const handleToggleBar = () => {
    setIsShow(!isShow);
    setIsHidden(true);
  };
  const { user, signOutUser } = useAuth();
  const handleSignOutUser = () => {
    signOutUser();
    navigate('/');
    window.scrollTo(0, 0);
  };
  return (
    <>
      <section className="shadow fixed left-0 w-full z-20 top-0 backdrop-blur bg-gray-50 bg-opacity-15 dark:bg-gray-900 dark:bg-opacity-90 px-5 py-5">
        <div className="container px-2 md:px-5 mx-auto">
          <nav className="flex justify-between items-center">
            <div>
              <Link className="logo flex items-center" to="/">
                <img className="h-[30px] md:h-[40px] mr-2 dark:invert" src={logoIcon} alt="logo" />
                <h3 className="text-xl md:text-2xl font-medium md:font-semibold dark:text-white">
                  Blog
                  <span
                    style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    }}
                    className="text-secondary">
                    Beat
                  </span>
                </h3>
              </Link>
            </div>
            <div className="menu lg:bg-white lg:shadow-sm lg:px-5 md:py-2 lg:rounded-md dark:lg:bg-gray-800">
              <ul
                className={`lg:flex w-full text-sm text-center z-10 py-5 lg:py-0 lg:bg-transparent dark:lg:bg-transparent space-y-5 lg:space-y-0 left-0 right-0 mx-auto absolute lg:static flex-col justify-center lg:flex-row gap-5 items-center top-[70px] md:top-[80px] ${
                  isShow ? 'block bg-white dark:bg-gray-800' : 'hidden'
                }`}>
                <li
                  onClick={() => {
                    setIsShow(!isShow);
                    window.scrollTo(0, 0);
                  }}>
                  <NavLink
                    className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-gray-700 dark:text-gray-300'} hover:text-secondary duration-100 flex justify-center items-center gap-1`}
                    to="/">
                    Home
                  </NavLink>
                </li>
                {user && (
                  <li
                    onClick={() => {
                      setIsShow(!isShow);
                      window.scrollTo(0, 0);
                    }}>
                    <NavLink
                      className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-gray-700 dark:text-gray-300'} hover:text-secondary duration-100 flex justify-center items-center gap-1`}
                      to="/add-blog">
                      Add Blog
                    </NavLink>
                  </li>
                )}
                <li
                  onClick={() => {
                    setIsShow(!isShow);
                    window.scrollTo(0, 0);
                  }}>
                  <NavLink
                    className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-gray-700 dark:text-gray-300'} hover:text-secondary duration-100 flex justify-center items-center gap-1`}
                    to="/all-blogs">
                    All blogs
                  </NavLink>
                </li>
                <li
                  onClick={() => {
                    setIsShow(!isShow);
                    window.scrollTo(0, 0);
                  }}>
                  <NavLink
                    className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-gray-700 dark:text-gray-300'} hover:text-secondary duration-100 flex justify-center items-center gap-1`}
                    to="/features">
                    Featured Blogs
                  </NavLink>
                </li>
                {user && (
                  <li
                    onClick={() => {
                      setIsShow(!isShow);
                      window.scrollTo(0, 0);
                    }}>
                    <NavLink
                      className={({ isActive }) => `${isActive ? 'text-secondary' : 'text-gray-700 dark:text-gray-300'} hover:text-secondary duration-100 flex justify-center items-center gap-1`}
                      to="/wishlist">
                      Wishlist
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="user-info flex gap-5 items-center">
              {user && <ThemeToggle />}

              {user ? (
                <div
                  className={`flex-col bg-white lg:bg-transparent absolute lg:static w-full lg:fit left-0 top-[75px] py-5 lg:py-0 gap-5 lg:flex-row justify-center lg:gap-4 items-center ${
                    !isHidden ? 'flex' : 'hidden lg:flex'
                  } `}>
                  <div className="flex justify-center flex-col items-center">
                    <img
                      referrerPolicy="no-referrer"
                      className="w-[80px] min-h-[80px] lg:min-h-[35px] rounded-full p-1 md:p-0 bg-white border lg:w-9 dark:border-gray-600"
                      src={user?.photoURL}
                      alt=""
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content={user?.displayName}
                      data-tooltip-tip="React-tooltip"
                    />

                    <div onClick={() => setIsHidden(true)} className="absolute lg:hidden top-5 border text-xl cursor-pointer lg:text-2xl bg-white hover:bg-slate-200 dark:hover:bg-gray-700 right-5">
                      <RxCross1 className="dark:text-white" />
                    </div>
                  </div>
                  <button
                    onClick={handleSignOutUser}
                    style={{
                      textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                    }}
                    className="px-3 flex items-center gap-2 rounded-full shadow text-sm py-2 bg-secondary font-medium text-white">
                    Log Out <MdOutlineLogout className="text-lg" />
                  </button>
                </div>
              ) : (
                <div className={`${loading ? 'opacity-0' : 'opacity-100'} flex items-center gap-4 md:gap-8 font-medium dark:text-white`}>
                  <ThemeToggle />
                  <Link to="/login" className="dark:hover:text-gray-300">
                    Log In
                  </Link>
                  <Link to="/register" className="dark:hover:text-gray-300 hidden md:block">
                    Register
                  </Link>
                </div>
              )}
            </div>
            <div className="bar-icon flex items-center gap-4 ml-1 z-20 cursor-pointer lg:hidden text-xl">
              {user && (
                <div title="User Details" onClick={handleToggleUser} className={`w-8 border overflow-hidden rounded-full bg-slate-50 inline-block lg:hidden dark:border-gray-600`}>
                  <img className="min-h-[30px]" src={user?.photoURL} alt="" />
                </div>
              )}
              <div className={`${!isShow ? 'dark:text-white' : 'text-secondary'}`} onClick={handleToggleBar}>
                {isShow ? <RxCross1 /> : <FaBarsStaggered />}
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
};

export default Navbar;
