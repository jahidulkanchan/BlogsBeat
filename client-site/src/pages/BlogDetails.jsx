import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import CommentCard from '../components/CommentCard';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const axiosSecure = useAxiosSecure();
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const email = user?.email;
  const { _id, title, category, photo, addDate, shortDesc, longDesc, ownerEmail } = blog || {};

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_api_url}/comments/${id}`);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const commentData = {
      id: _id,
      photo: user?.photoURL,
      author: user?.displayName,
      comment,
    };
    if (email) {
      try {
        const { data } = await axiosSecure.post(`/comments?email=${email}`, commentData);
        if (data.acknowledged) {
          toast.success('Comment added successfully');
        }
        e.target.reset();
        fetchComments();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_api_url}/blog/${id}`);
      setBlog(data);
    };
    fetchBlogDetails();
  }, [id]);

  return (
    <>
      <section className="mx-auto container px-2 md:px-5 mt-[120px] rounded-lg dark:bg-gray-900">
        <div className="grid md:gap-5 grid-cols-12">
          {/* Blog Content Section */}
          <div className="details-card border col-span-12 md:col-span-7 mb-8 px-5 lg:px-8 py-5 shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-wrap justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-medium md:font-semibold mb-2 dark:text-white">{title}</h1>
                <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">Post: {addDate}</p>
              </div>
              <p className="text-white text-center ml-auto py-1 md:py-2 mb-5 h-fit px-8 rounded-full bg-violet-700 dark:bg-violet-600">{category}</p>
            </div>

            <img src={photo} alt={title} className="w-full h-[200px] md:h-[300px] object-cover mb-4 dark:brightness-90" />

            <div className="dark:text-gray-300">
              <p className="flex flex-col text-gray-600 dark:text-gray-300 mb-4">
                <span className="text-lg text-black dark:text-white">Short Description:</span>
                {shortDesc}
              </p>
              <p className="flex flex-col text-gray-600 dark:text-gray-300 mb-2">
                <span className="text-lg text-black dark:text-white">Long Description:</span>
                {longDesc}
              </p>
            </div>

            {/* Comment Form */}
            {user?.email !== ownerEmail ? (
              <form onSubmit={handleComment}>
                <textarea
                  name="comment"
                  placeholder="Leave a Comment"
                  className="w-full border h-[90px] outline-none p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  required></textarea>
                <div className="flex mt-2 justify-between items-center">
                  <Link onClick={() => window.scrollTo(0, 0)} to="/all-blogs" className="px-6 py-2 bg-primary text-white rounded dark:bg-primary-dark">
                    <FaArrowLeftLong />
                  </Link>
                  <button className="px-5 py-2 bg-secondary text-white block rounded w-fit dark:bg-secondary-dark">Send</button>
                </div>
              </form>
            ) : (
              <p className="py-3 border px-2 my-4 md:mx-4 text-red-600 dark:text-red-400 dark:border-gray-600">Can not comment on own blog</p>
            )}

            {/* Blog Owner Actions */}
            <div className="flex items-center justify-between">
              {user?.email === ownerEmail && (
                <>
                  <Link onClick={() => window.scrollTo(0, 0)} to="/all-blogs" className="px-6 py-2 text-white rounded bg-primary dark:bg-primary-dark">
                    <FaArrowLeftLong />
                  </Link>
                  <Link onClick={() => window.scrollTo(0, 0)} to={`/update-blog/${id}`} className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700">
                    Update Blog
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="col-span-12 md:col-span-5 border p-3 dark:bg-gray-800 dark:border-gray-700">
            <div className="overflow-y-auto scroll-m-1 max-h-svh">
              <h3 className="text-lg font-medium mb-3 dark:text-white">All Comments: {comments.length}</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentCard commentData={comment} key={comment._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetails;
