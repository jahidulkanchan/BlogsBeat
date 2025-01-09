import { createBrowserRouter, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddBlog from "../pages/AddBlog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateProfile from "../private-routes/PrivateProfile";
import PrivateLogin from "../private-routes/PrivateLogin";
import AllBlogs from "../pages/AllBlogs";
import BlogDetails from "../pages/BlogDetails";
import UpdateBlog from "../pages/UpdateBlog";
import Wishlist from "../pages/Wishlist";
import Features from "../pages/Features";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [ {
      path: "/",
      element: <Home></Home>,
      }, 
      {
        path: "/add-blog",
        element: <PrivateProfile><AddBlog/></PrivateProfile>,
      }
      ,{
        path: "/all-blogs",
        element: <AllBlogs/>,
        loader: ()=> fetch(`${import.meta.env.VITE_api_url}/all-blogs`),
      },
      {
        path: "/features",
        element: <Features/>
      },{
        path: "/wishlist",
        element: <PrivateProfile><Wishlist/></PrivateProfile>
      },
      {
        path: "/login",
        element: <PrivateLogin><Login/></PrivateLogin>
      },
      {
        path: "/register",
        element: <PrivateLogin><Register/></PrivateLogin>
      },
      {
        path: '/blog/:id',
        element: <PrivateProfile><BlogDetails/></PrivateProfile> 
      },
      {
        path: '/update-blog/:id',
        element: <PrivateProfile><UpdateBlog/></PrivateProfile> 
      }
    ],
    errorElement:  <div className="min-h-screen text-xl flex flex-col justify-center items-center">
    <p><img src="/Error-404.webp" alt="" /></p>
    <small className="bg-slate-200 px-5 py-1 mt-4">
      <Link to="/">Go Back</Link>
    </small>
  </div>
  },
]);