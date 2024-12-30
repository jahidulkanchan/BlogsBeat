import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const RecentBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
    const fetchAllBlogs = async() =>{
      setLoading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_api_url}/all-blogs?recentBlog=true`)
      setBlogs(data)
      setLoading(false)
    }
    fetchAllBlogs()
  },[])
  return (
    <>
      <section id="recent-post" className="px-2 md:px-5 mt-[50px] container mx-auto">
      <h2 className="text-3xl text-center mt-5 md:mt-8 font-medium md:font-semibold md:mb-10">
      Explore <span 
         style={{
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
        }}
       className="text-secondary">
         Recent Blogs
          </span>
        </h2><br />
        <div  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
         {loading? Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
            <div className="">
              <Skeleton className="h-48"/>
            </div>
          <div className="px-4 pt-1 pb-5 flex flex-col flex-grow">
            <div className="flex justify-between gap-3 items-center">
              <p className="w-[100px]"><Skeleton /></p> 
              <p className="w-[100px]"><Skeleton /></p> 
            </div>
            <p className=""><Skeleton className="h-10 my-2" /></p>
            <div className="flex justify-between">
              <p className="w-[80px]"><Skeleton className="h-10"/></p>
              <p className="w-[150px]"><Skeleton className="h-10"/></p>
            </div>
          </div>
        </div>
        )) : 
          blogs.map(blog => <BlogCard blog={blog} key={blog?._id}></BlogCard>)
         }
        </div>
      </section>
    </>
  );
};

export default RecentBlog;