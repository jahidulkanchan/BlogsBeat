import axios from 'axios';
import { useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { IoIosSearch } from 'react-icons/io';
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLoaderData } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const AllBlogs = () => {
  const countData = useLoaderData();
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 9;
  const count = countData?.length;
  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    const fetchAllBlogs = async () => {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_api_url}/all-blogs?category=${category}&search=${search}&page=${currentPage}&size=${itemPerPage}`);
      setBlogs(data);
      setLoading(false);
    };
    fetchAllBlogs();
  }, [category, search, currentPage]);

  const handleResetFilter = () => {
    setCategory('');
    setSearch('');
  };

  return (
    <>
      <section className="px-2 container mx-auto min-h-[510px] pt-[100px] md:pt-[120px] md:px-5 dark:bg-gray-900">
        <div className="filter-box flex md:justify-center flex-wrap gap-5 md:gap-7">
          <div className="search max-w-[320px] flex items-center gap-2 pr-4 border bg-white w-fit dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
              <input
                placeholder="Search blog"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="p-2 bg-transparent outline-none dark:text-white dark:placeholder-gray-400"
                type="text"
              />
              <div className="icon text-lg absolute top-3 right-2 dark:text-gray-300">
                <IoIosSearch />
              </div>
            </div>
          </div>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border w-fit outline-none bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            name="category"
            id="category"
            value={category}
            required>
            <option value="" disabled className="dark:bg-gray-800">
              Select a category
            </option>
            <option value="Travel" className="dark:bg-gray-800">
              Travel
            </option>
            <option value="Lifestyle" className="dark:bg-gray-800">
              Lifestyle
            </option>
            <option value="Technology" className="dark:bg-gray-800">
              Technology
            </option>
            <option value="Sports" className="dark:bg-gray-800">
              Sports
            </option>
            <option value="Entertainment" className="dark:bg-gray-800">
              Entertainment
            </option>
          </select>
          <button onClick={handleResetFilter} className="py-2 px-4 w-fit border bg-white outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <GrPowerReset className="dark:text-gray-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 my-8 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full dark:bg-gray-800 dark:border dark:border-gray-700">
                  <div className="">
                    <Skeleton className="h-48 dark:bg-gray-700" baseColor="#374151" highlightColor="#4B5563" />
                  </div>
                  <div className="px-4 pt-1 pb-5 flex flex-col flex-grow">
                    <div className="flex justify-between gap-3 items-center">
                      <p className="w-[100px]">
                        <Skeleton baseColor="#374151" highlightColor="#4B5563" />
                      </p>
                      <p className="w-[100px]">
                        <Skeleton baseColor="#374151" highlightColor="#4B5563" />
                      </p>
                    </div>
                    <p className="">
                      <Skeleton className="h-10 my-2" baseColor="#374151" highlightColor="#4B5563" />
                    </p>
                    <div className="flex justify-between">
                      <p className="w-[80px]">
                        <Skeleton className="h-10" baseColor="#374151" highlightColor="#4B5563" />
                      </p>
                      <p className="w-[150px]">
                        <Skeleton className="h-10" baseColor="#374151" highlightColor="#4B5563" />
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : blogs.map((blog) => <BlogCard blog={blog} key={blog?._id} />)}
        </div>

        {blogs.length === 0 && <p className="text-center text-xl text-secondary my-[100px] dark:text-secondary-dark">Blogs Not Found</p>}

        {blogs.length > 0 && (
          <div className="pagination flex justify-center gap-2 pb-5 md:gap-5">
            <button
              onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
              className="pr-2 pl-1 flex gap-2 items-center py-1.5 border border-primary text-primary hover:bg-darkPrimary hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
              <MdOutlineKeyboardDoubleArrowLeft className="dark:text-gray-300" />
              <span>Prev</span>
            </button>
            {pages.map((page, i) => (
              <button
                onClick={() => setCurrentPage(page)}
                className={`border border-primary text-primary hover:bg-darkPrimary duration-100 hover:text-white px-3 md:px-5 py-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white ${
                  currentPage === page ? 'bg-darkPrimary text-white dark:bg-gray-700 dark:text-white' : ''
                }`}
                key={i}>
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => currentPage < numberOfPages - 1 && setCurrentPage(currentPage + 1)}
              className="pl-3 pr-1 flex items-center gap-2 py-1 border border-primary text-primary hover:bg-darkPrimary hover:text-white dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
              <span>Next</span>
              <MdKeyboardDoubleArrowRight className="dark:text-gray-300" />
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default AllBlogs;
