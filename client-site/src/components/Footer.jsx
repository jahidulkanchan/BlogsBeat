import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const Footer = () => {
  const {isdark} = useAuth()
  return (
    <footer className={` px-5 py-5`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
        <Link onClick={()=> window.scrollTo(0,0)} className={`logo flex items-center ${isdark ? 'text-white' : ''}`} to="/">
             <img className="h-[30px] md:h-[40px] mr-2" src='/logo.png' alt="logo" />
              <h3 className="text-xl md:text-2xl font-medium md:font-semibold">
                Blog<span 
                style={{
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                }}
                className="text-secondary">Beat</span>
              </h3>
        </Link>
        <p className="py-2 text-[15px] tracking-[.2px] sm:w-4/5">Sharing valuable insights and stories on Lifestyle, Entertainment, Travel, Sports, and Technology to inspire and connect readers through high-quality content</p>
        <p 
        style={{
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
        }}
        className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} All Rights Reserved. Designed by JK.
      </p>
        <ul className="flex gap-5 mb-5 mt-5 text-2xl">
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://www.facebook.com/'><FaFacebookSquare /></Link>
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://bd.linkedin.com/'><FaLinkedin /></Link>
          <Link className="hover:-translate-y-1 duration-200 hover:text-secondary" to='https://x.com/'><FaTwitterSquare /></Link>
        </ul>
        <hr className="md:hidden" />
        </div>
        <div>
          <h2 
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
          className="text-xl md:text-2xl md:font-semibold text-secondary mb-3">Features</h2>
          <ul className="space-y-1 text-[14px]">
            <li><Link onClick={()=> window.scrollTo(0,0)} className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/'>Home</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/add-blog'>Add Blog</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/all-blogs'>All Blogs</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/features'>Featured Blogs</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='/wishlist'>Wishlist</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h2 
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
          className="text-xl md:text-2xl md:font-semibold text-secondary mb-3">Popular category </h2>
          <ul className="space-y-1 text-[14px]">
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='https://livenostress.com/' target="_blank" rel="noopener noreferrer">Travel</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='https://ourbloglife.com/' target="_blank" rel="noopener noreferrer">Lifestyle</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='https://www.technewsworld.com/section/tech-blog' target="_blank" rel="noopener noreferrer">Technology</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='https://www.sportsblog.com/' target="_blank" rel="noopener noreferrer">Sports</Link></li>
            <li><Link className="hover:text-secondary hover:translate-x-2 inline-block duration-150" to='https://feedly.com/i/top/entertainment-blogs' target="_blank" rel="noopener noreferrer">Entertainment</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;