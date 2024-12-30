/* eslint-disable react/prop-types */

const CommentCard = ({commentData}) => {
  const {comment,photo,author} = commentData;
  return (
    <>
      <div className="card border px-2 py-4 my-2 shadow-md hover:shadow-lg duration-50">
        <div className="flex items-center gap-3">
          <img className="w-[40px]" src={photo} alt="" />
          <p className="text-lg">{author}</p>
        </div>
        <p className="text-slate-600"><span className="font-medium text-black">Comment: </span> {comment}</p>
      </div>
    </>
  );
};

export default CommentCard;