import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const UpdateBlog = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const email = user?.email;
  const [blog, setBlog] = useState([]);
  const { title, category, photo, shortDesc, longDesc } = blog || {};

  useEffect(() => {
    const fetchUpdateBlog = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_api_url}/update-blog/${id}`);
      setBlog(data);
    };
    fetchUpdateBlog();
  }, [id]);

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const form = e.target;
    const photo = form.photo.value;
    const title = form.title.value;
    const shortDesc = form.shortDesc.value;
    const longDesc = form.longDesc.value;
    const descLength = longDesc.length;
    const category = form.category.value;
    const blogInfo = {
      title,
      photo,
      category,
      shortDesc,
      longDesc,
      descLength,
      addDate: format(new Date(), 'Pp'),
      ownerEmail: user?.email,
    };
    try {
      const { data } = await axiosSecure.patch(`/update-blog/${id}?email=${email}`, blogInfo);
      if (data?.modifiedCount > 0) {
        toast.success('Blog Updated successfully');
        navigate(`/blog/${id}`);
      }
      if (data?.message) {
        toast.error(data?.message);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className={`px-2 md:px-5 mx-auto container pt-[90px] py-10 bg-gray-900 text-white`}>
      <h2 className="text-3xl text-center font-medium md:font-semibold mt-[30px] mb-5">
        <span>Update </span>
        <span
          style={{
            textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
          }}
          className="text-secondary">
          Blog Content
        </span>
      </h2>
      <form onSubmit={handleUpdateBlog} className={`md:w-10/12 lg:w-8/12 py-8 flex flex-col justify-center items-center border space-y-4 shadow-md mx-auto min-h-[350px] bg-gray-800`}>
        <div className="grid gap-5 md:mx-5 sm:grid-cols-2">
          <div className="col-span-2 sm:col-span-1">
            <label className="mb-2 md:font-semibold" htmlFor="title">
              Blog Title:
            </label>
            <br />
            <input className="p-2 w-full bg-gray-700 border text-white outline-none" type="text" placeholder="Title of blog" name="title" defaultValue={title} required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="mb-2 md:font-semibold" htmlFor="category">
              Category:
            </label>
            {blog?.category && (
              <select className="p-2 w-full bg-gray-700 border text-white outline-none" name="category" id="category" defaultValue={category} required>
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            )}
          </div>
          <div className="col-span-2">
            <label className="mb-2 md:font-semibold" htmlFor="photo">
              Image URL:
            </label>
            <br />
            <input className="p-2 w-full bg-gray-700 border text-white outline-none" type="text" placeholder="Blog Image URL" name="photo" defaultValue={photo} required />
          </div>
          <div className="col-span-2">
            <label className="mb-2 md:font-semibold" htmlFor="shortDesc">
              Short Description:
            </label>
            <br />
            <textarea
              className="p-2 w-full h-[50px] md:h-[70px] bg-gray-700 border text-white outline-none"
              name="shortDesc"
              id="shortDesc"
              defaultValue={shortDesc}
              placeholder="Short description"
              required></textarea>
          </div>
          <div className="col-span-2">
            <label className="mb-2 md:font-semibold" htmlFor="longDesc">
              Long Description:
            </label>
            <br />
            <textarea
              className="p-2 w-full h-[100px] md:h-[150px] bg-gray-700 border text-white outline-none"
              name="longDesc"
              defaultValue={longDesc}
              id="longDesc"
              placeholder="Long Description"
              required></textarea>
          </div>
        </div>
        <br />
        <div>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="hover:shadow-lg duration-150 bg-secondary w-full rounded-full px-8 py-2 text-white">
            Update Blog
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateBlog;
