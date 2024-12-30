import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import BlogCard from "../components/BlogCard";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLoaderData } from "react-router-dom";

const AllBlogs = () => {
  const countData = useLoaderData()
  const [blogs,setBlogs] = useState([])
  const [category,setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage,setCurrentPage] = useState(0)
  const itemPerPage = 6;
  const count = countData?.length
  const numberOfPages = Math.ceil(count/itemPerPage);
  // const pages = []
  // for(let i = 0; i < numberOfPages; i++) {
  //   pages.push(i)
  // }
  // console.log(pages);
  const pages = [...Array(numberOfPages).keys()];
  useEffect(()=> {
    const fetchAllBlogs = async() =>{
      setLoading(true)
      const {data} = await axios.get(`${import.meta.env.VITE_api_url}/all-blogs?category=${category}&search=${search}&page=${currentPage}&size=${itemPerPage}`)
      setBlogs(data)
      setLoading(false)
    }
    fetchAllBlogs()
  },[category,search,currentPage])

  const handleResetFilter = ()=>{
    setCategory('')
    setSearch('')
  }
  return (
    <>
      <section className='px-2 container mx-auto min-h-[510px] pt-[100px] md:pt-[120px] md:px-5'> 
        <div className="filter-box flex md:justify-center flex-wrap gap-5 md:gap-7">
          <div className="search max-w-[320px] flex items-center gap-2 pr-4 border bg-white w-fit">
            <div className="relative">
              <input placeholder="Search blog" onChange={(e)=> setSearch(e.target.value)} value={search} className="p-2 bg-transparent outline-none" type="text" />
              <div className="icon text-lg absolute top-3 right-2"><IoIosSearch /></div>
            </div>
          </div>
          <select onChange={(e)=> setCategory(e.target.value)} className="p-2 border w-fit outline-none bg-white" name="category" id="category" value={category} required>
            <option value="" disabled>Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Technology">Technology</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <button onClick={handleResetFilter} className="py-2 px-4 w-fit border bg-white outline-none">Reset</button>
        </div>
        <div className="grid grid-cols-1 my-8 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading?  Array.from({ length: 6 }).map((_, i) => (
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
          ))
           : blogs.map(blog => <BlogCard blog={blog} key={blog?._id}></BlogCard>)}
          
        </div>
        <div className="pagination flex justify-center gap-2 md:gap-5">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          className="px-5 py-1 border border-primary text-primary hover:bg-darkPrimary hover:text-white"
        >
          Prev
        </button>
        {pages.map((page, i) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={`border border-primary text-primary hover:bg-darkPrimary duration-100 hover:text-white px-3 md:px-5 py-1 ${currentPage === page ? 'bg-darkPrimary text-white' : ''}`}
            key={i}
          >
            {page + 1}
          </button>
  ))}
  <button
    onClick={() => currentPage < numberOfPages - 1 && setCurrentPage(currentPage + 1)}
    className="px-5 py-1 border border-primary text-primary hover:bg-darkPrimary hover:text-white"
  >
    Next
  </button>
        </div>

      </section>
    </>
  );
};

export default AllBlogs;