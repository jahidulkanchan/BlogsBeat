import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateProfile = ({ children }) => {
  const { loading, user } = useAuth();
  const {pathname}  = useLocation()
  if (loading) {
    return (
      <div className="bg-slate-50 flex justify-center items-center min-h-[85vh]">
        <img className="w-10 md:w-14" src="/loading.gif" alt="" />
      </div>
    );
  }
  if (user) {
    return children;
  } 
  else{
    return <Navigate to="/login" state={pathname} />;
  }
};

export default PrivateProfile;
