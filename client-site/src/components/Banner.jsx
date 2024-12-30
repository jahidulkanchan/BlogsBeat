import { CgCommunity } from 'react-icons/cg';
import bannerImg from '../assets/counter-banner.jpg';
import { motion } from "motion/react"
const Banner = () => {
  return (
    <section
      className="relative flex flex-col justify-center bg-top items-center px-2 pt-[50px] md:min-h-[550px] bg-cover text-white bg-blend-multiply bg-primary bg-opacity-85 mt-[75px] md:mt-[80px] md:px-8"
      style={{ backgroundImage: `url(${bannerImg})`}}
    >
      <motion.h2 initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 1, transition: { duration: 0.5 , opacity: 0} }} 
       style={{
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
      }}
      className='text-4xl text-center md:text-6xl font-semibold'>Discover, Learn, and   <span className='text-secondary'>Stay Inspired</span></motion.h2>
      <motion.p initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }} 
      style={{
        textShadow: "5px 5px 5px rgba(0, 0, 0, 0.4)",
      }}
      className='text-center text-slate-50 text-sm md:text-base font-light md:w-10/12 mt-5'>Explore a space where ideas come alive, and stories shape your world. Dive into a diverse collection of articles, expert insights, and trending topics that spark curiosity and fuel inspiration. Whether you&apos;re here for the latest tech updates, gaming reviews, or lifestyle tips, we&apos;ve got something special for everyone.</motion.p><br />
      <div className="btn-box flex gap-3 md:gap-8 mt-3 md:mt-[10px] pb-[80px]">
        <button onClick={() => document.getElementById('recent-post').scrollIntoView({ behavior: 'smooth' })} className='bg-secondary hover:text-secondary hover:bg-white text-white duration-200 px-3 md:px-5 flex gap-2 items-center text-sm md:text-base rounded-full py-2 font-medium md:font-semibold'>Latest Articles</button>
        <button onClick={() => document.getElementById('community').scrollIntoView({ behavior: 'smooth' })} className='bg-white hover:text-white hover:bg-secondary text-secondary duration-200 px-3 md:px-5 flex gap-2 items-center sm:text-base rounded-full py-2 font-medium md:font-semibold'>
         <motion.span
            style={{
              textShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
            }}
            animate={{ rotate: 360 }}
            transition={{duration: 2, repeat: Infinity, ease: "linear"}} className='text-[25px] rounded-full'><CgCommunity /></motion.span> <span className='text-sm md:text-base'>Join Community</span>
        </button>
      </div>
    </section>
  );
};

export default Banner;
