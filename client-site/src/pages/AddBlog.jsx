import { format } from "date-fns";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddBlog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();
  const handleAddBlog = async (e) => {
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
      addDate: format(new Date(), "Pp"),
      ownerEmail: user?.email,
    };
    try {
      const {data} = await axiosSecure.post(`/add-blog?email=${email}`, blogInfo);
      if(data?.acknowledged){
        toast.success("Blog added successfully");
        setTimeout(() => {
          navigate("/all-blogs");
          window.scrollTo(0, 0);
        }, 
        300);
      }
      if (data?.message) {
       toast.error(data.message);
     } 
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <section className={`px-2 md:px-5 mx-auto container pt-[90px] py-10`}>
        <h2 className="text-3xl text-center mt-8 font-semibold mb-10">
          <span 
          style={{
            textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
          }}
          className="text-secondary">
            Add Your 
          </span>{" "}
          <span> Blog Content</span>
        </h2>
        <form
          onSubmit={handleAddBlog}
          className={`w-11/12 md:w-10/12 lg:w-8/12 py-8 flex flex-col justify-center items-center border space-y-4 shadow-md mx-auto min-h-[350px]`}
        >
          <div className="grid gap-5 mx-5 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className=" mb-2 font-semibold" htmlFor="title">
                Blog Title:
              </label>
              <br />
              <input
                className="p-2 w-full bg-slate-100 border outline-none"
                type="text"
                placeholder="Title of blog"
                name="title"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className=" mb-2 font-semibold" htmlFor="category">
                Category:
              </label>
              <select
                className="p-2 w-full bg-slate-100 border outline-none"
                name="category"
                id="category"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className=" mb-2 font-semibold" htmlFor="photo">
                Image URL:
              </label>
              <br />
              <input
                className="p-2 w-full bg-slate-100 border outline-none"
                type="text"
                placeholder="Blog Image URL"
                name="photo"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="mb-2 font-semibold" htmlFor="shortDesc">
                Short Description:
              </label>
              <br />
              <textarea
                className="p-2 w-full h-[50px] md:h-[70px] bg-slate-100 border outline-none"
                name="shortDesc"
                id="shortDesc"
                placeholder="Short description"
                required
              ></textarea>
            </div>
            <div className="col-span-2">
              <label className=" mb-2 font-semibold" htmlFor="longDesc">
                Long Description:
              </label>
              <br />
              <textarea
                className="p-2 w-full h-[100px] md:h-[150px] bg-slate-100 border outline-none"
                name="longDesc"
                id="longDesc"
                placeholder="Long Description"
                required
              ></textarea>
            </div>
          </div>
          <br />
          <div>
            <button className="hover:shadow-lg duration-150 bg-secondary w-full  px-8 py-2 rounded-full text-white">
              Add Blog
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBlog;
