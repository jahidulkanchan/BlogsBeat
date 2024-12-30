import toast from "react-hot-toast";
import bgImage from '../assets/counter-banner.jpg'

const Subscribe = () => {
  const handleMessage = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter");
    e.target.reset();
  };
  return (
    <>
      <section
        id="community"
        className="lg:w-10/12 flex container flex-col my-[30px] md:my-[50px] justify-center items-center mx-auto pt-5"
      >
        <h2 className="text-3xl text-center md:mt-4 font-medium md:font-semibold mb-10">
          Join the <span
             style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
           className="text-secondary">Community</span>
        </h2>
        <div
          style={{backgroundImage: `url(${bgImage})`}}
          className={`rounded-2xl flex flex-col bg-primary bg-center bg-cover bg-blend-multiply bg-opacity-85 justify-center items-center px-3 md:px-5 w-11/12 py-10 md:min-h-[300px]`}
        >
          <h2 
           style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
          }}
          className="text-2xl text-white md:text-3xl text-center font-semibold ">
            Subscribe to our weekly newsletter!
          </h2>
          <p
            style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
            }}
           className="text-center tracking-wide text-slate-100 mt-2 text-sm md;mb-5 md:text-base lg:px-28 md:mt-4">
            Get the best of our blog straight to your inbox! Subscribe to our
            weekly newsletter for fresh insights, tips, and inspiration.
          </p>
          <br />
          <form
            onSubmit={handleMessage}
            className="mx-auto shadow-xl flex justify-center w-fit"
          >
            <input
              className={`px-5 py-2 rounded-l-full w-full md:min-w-[200px] outline-none`}
              type="email"
              placeholder="Type Your Email"
              required
            />
            <button
             style={{
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
            }}
             className="px-5 py-2 rounded-r-full text-white font-medium text-blue bg-secondary ">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
