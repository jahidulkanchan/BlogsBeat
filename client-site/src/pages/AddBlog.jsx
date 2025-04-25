import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

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
      addDate: format(new Date(), 'Pp'),
      ownerEmail: user?.email,
    };

    try {
      const { data } = await axiosSecure.post(`/add-blog?email=${email}`, blogInfo);
      if (data?.acknowledged) {
        toast.success('Blog added successfully');
        setTimeout(() => {
          navigate('/all-blogs');
          window.scrollTo(0, 0);
        }, 300);
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
      <section className={`px-2 md:px-5 mx-auto container pt-[90px] py-10 dark:bg-gray-900 min-h-screen`}>
        <h2 className="text-3xl text-center mt-8 font-semibold mb-10 dark:text-white">
          <span
            style={{
              textShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
            }}
            className="text-secondary">
            Add Your
          </span>{' '}
          <span className="dark:text-gray-300">Blog Content</span>
        </h2>

        <form
          onSubmit={handleAddBlog}
          className={`w-11/12 md:w-10/12 lg:w-8/12 py-8 flex flex-col justify-center items-center border space-y-4 shadow-md mx-auto rounded-xl min-h-[350px] dark:bg-gray-800 dark:border-gray-700`}>
          <div className="grid gap-5 mx-5 sm:grid-cols-2 w-full px-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-2 font-medium dark:text-gray-300" htmlFor="title">
                Blog Title:
              </label>
              <br />
              <input
                className="p-2 rounded-md w-full bg-slate-100 border outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                type="text"
                placeholder="Title of blog"
                name="title"
                required
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="mb-2 font-medium dark:text-gray-300" htmlFor="category">
                Category:
              </label>
              <select className="p-2 rounded-md w-full bg-slate-100 border outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" name="category" id="category" defaultValue="" required>
                <option value="" disabled className="dark:bg-gray-700">
                  Select a Category
                </option>
                <option value="Travel" className="dark:bg-gray-700">
                  Travel
                </option>
                <option value="Lifestyle" className="dark:bg-gray-700">
                  Lifestyle
                </option>
                <option value="Technology" className="dark:bg-gray-700">
                  Technology
                </option>
                <option value="Sports" className="dark:bg-gray-700">
                  Sports
                </option>
                <option value="Entertainment" className="dark:bg-gray-700">
                  Entertainment
                </option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="mb-2 font-medium dark:text-gray-300" htmlFor="photo">
                Image URL:
              </label>
              <br />
              <input
                className="p-2 w-full rounded-md bg-slate-100 border outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                type="text"
                placeholder="Blog Image URL"
                name="photo"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 font-medium dark:text-gray-300" htmlFor="shortDesc">
                Short Description:
              </label>
              <br />
              <textarea
                className="p-2 w-full rounded-md h-[50px] md:h-[70px] bg-slate-100 border outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                name="shortDesc"
                id="shortDesc"
                placeholder="Short description"
                required></textarea>
            </div>

            <div className="col-span-2">
              <label className="mb-2 font-medium dark:text-gray-300" htmlFor="longDesc">
                Long Description:
              </label>
              <br />
              <textarea
                className="p-2 w-full rounded-md h-[100px] md:h-[150px] bg-slate-100 border outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                name="longDesc"
                id="longDesc"
                placeholder="Long Description"
                required></textarea>
            </div>
          </div>

          <br />
          <div className="w-full px-4">
            <button className="hover:shadow-lg duration-150 bg-secondary w-full px-8 py-2 rounded-full text-white dark:hover:bg-opacity-90">Add Blog</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBlog;
