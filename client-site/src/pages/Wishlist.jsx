import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { MdDeleteForever, MdOutlineSettings, MdTitle } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { format } from "date-fns";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      const { data } = await axiosSecure.get(`/wishlist/${email}`);
      setWishlist(data);
      setLoading(false);
    };
    fetchWishlist();
  }, [email, axiosSecure]);

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3 justify-center items-center">
        <p>Are you sure you want to delete?</p>
        <div>
          <button
            className="text-sm bg-primary text-white px-4 py-2 mr-5"
            onClick={() => {
              handleWishlistDelete(id);
              toast.dismiss(t.id);
            }}
          >
            Confirm
          </button>
          <button
            className="text-sm text-white bg-secondary px-4 py-2"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleWishlistDelete = async (id) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_api_url}/wishlist/${id}`
    );
    if (data.deletedCount > 0) {
      const remaining = wishlist?.filter((item) => item._id !== id);
      toast.success("Deleted successfully!");
      setWishlist(remaining);
    }
  };

  return (
    <>
      <section className="px-2 md:px-5 container mx-auto xl:w-10/12 flex flex-col justify-center items-center min-h-[350px] pt-[120px] py-10">
        <h2 className="text-3xl text-center font-medium md:font-semibold mb-5">
          <span>Wishlist </span>
          <span
            style={{
              textShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)",
            }}
            className="text-secondary"
          >
            Dashboard
          </span>
        </h2>

        <div className="w-full overflow-x-auto">
          <table className="border-collapse border text-center border-gray-200 w-full">
            <thead className="bg-primary bg-opacity-95 text-white">
              <tr>
                <th className="border font-medium px-2 py-2">
                  <FaHashtag className="inline-block mr-1 text-lg mb-1" />
                </th>
                <th className="border font-medium px-2 py-2">
                  <MdTitle className="inline-block mr-1 text-lg mb-1" /> Blog
                  Title
                </th>
                <th className="border font-medium px-2 py-2">
                  <BiCategoryAlt className="inline-block mr-1 text-lg mb-1" />{" "}
                  Category
                </th>
                <th className="border font-medium px-2 py-2">
                  <AiOutlineCalendar className="inline-block mr-1 text-lg mb-1" />
                  Mark Date
                </th>
                <th className="border font-medium px-2 py-2">
                  <MdOutlineSettings className="inline-block mr-1 text-lg mb-1" />{" "}
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-50">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 py-2 px-2">
                        <Skeleton />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <Skeleton width="150px" />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <Skeleton width="100px" />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <Skeleton width="120px" />
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <Skeleton width="150px" />
                      </td>
                    </tr>
                  ))
                : wishlist?.map((item, i) => (
                    <tr key={item._id}>
                      <td className="border border-gray-300 py-2 px-2">
                        {i + 1}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {item.title}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {item.category}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        {format(new Date(item?.addDate), "P")}
                      </td>
                      <td className="border border-gray-300 py-2 px-2">
                        <div className="flex items-center justify-center gap-3">
                          <Link
                            to={`/blog/${item.id}`}
                            className="bg-primary bg-opacity-95 text-white border px-3 py-1 rounded"
                          >
                            <span>Details</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-secondary bg-white px-2 flex items-center gap-1 border py-1 rounded"
                          >
                            <span className="text-xl">
                              <MdDeleteForever />
                            </span>
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Wishlist;

