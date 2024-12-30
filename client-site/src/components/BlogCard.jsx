import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import {format} from 'date-fns'
import { useState } from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
 
// eslint-disable-next-line react/prop-types
const BlogCard = ({ blog }) => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const {user,setLoading,loading} = useAuth()
  const email = user?.email
  const {_id,title,category,photo,addDate,shortDesc} = blog || {};
  const [loadingId,setLoadingId] = useState('')
  const hanldeAddWishlist = async(load)=>{
    setLoadingId(load)
    const wishlistData = {
      id : _id,
      ownerEmail: user?.email,
      title,
      category,
      photo,
      addDate: format(new Date(), 'Pp') 
    }
    if(email){
        try{
          setLoading(true)
          const {data} = await axiosSecure.post(`${import.meta.env.VITE_api_url}/wishlist?email=${email}`, wishlistData)
          if(data?.acknowledged){
            setLoading(false)
            toast.success('Added to wishlist successfully!');
          }
           if (data?.message) {
              setLoading(false)
             toast.error(data.message);
           } 
           setLoadingId('')
         }
         catch(err){
           setLoading(false)
           toast.error(err.message)
         }
    }
    else{
      navigate('/login')
    }
  }
  return (
    <section>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
       <PhotoProvider>
        <PhotoView src={photo}>
        <img
        src={photo}
        alt={title}
        className="w-full h-48 object-cover"
          />
        </PhotoView>
       </PhotoProvider>
        <div className="px-4 pt-1 pb-5 flex flex-col flex-grow">
          <div className="flex justify-between gap-3 items-center">
            <div>
              <p className="date text-gray-500 text-[14px] my-3">{addDate}</p>
              <h2 className="text-xl font-semibold my-2">{title}</h2>
            </div>
            <p className="text-sm bg-primary bg-opacity-90 rounded-full px-5 py-1 text-white mb-2">{category}</p> 
          </div>
          <p className="text-sm text-gray-700 mb-4 flex-grow">{shortDesc}</p>
          <div className="flex justify-between">
            <Link onClick={()=> window.scrollTo(0,0)} to={`/blog/${_id}`} className="px-4 w-fit py-2 bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white duration-100 rounded">
              Details
            </Link>
            <button onClick={()=>hanldeAddWishlist(_id)} className={`px-4 py-2 bg-secondary text-white rounded hover:bg-white border border-secondary hover:text-secondary duration-100`}>
              {loading && loadingId === _id ? 'Loading..' : 'Add to Wishlist'} 
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCard; 