/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateLogin = ({children}) => {
  const {user,loading} = useAuth()
  const location = useLocation()
  if (loading) {
    return (
      <div className="bg-slate-50 flex justify-center items-center min-h-[85vh]">
        <img className="w-10 md:w-14" src="/loading.gif" alt="Loading..." />
      </div>
    );
  }
  if (user) {
    return <Navigate to={location?.state || "/"} />;
  }

  return children;
};

export default PrivateLogin;