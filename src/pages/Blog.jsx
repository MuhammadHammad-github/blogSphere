import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetOneBlog from "../hooks/highLevelHooks/blogs/useGetOneBlog";
import ReadOnlyEditor from "../components/ReadOnlyEditor";
import useGetUser from "../hooks/highLevelHooks/accounts/user/useGetUser";
import useAddComment from "../hooks/highLevelHooks/comments/useAddComment";
import { enqueueSnackbar } from "notistack";
import { Telegram } from "@mui/icons-material";
import Loader from "../components/Loader";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, refetch, fetchingBlog } = useGetOneBlog(id);
  const [date, setDate] = useState(null);
  const { userData } = useGetUser(localStorage.getItem("authToken"));
  const { addComment, fetching } = useAddComment(blog?._id);
  console.log(blog);
  useEffect(() => {
    if (!blog) return;
    const date = new Date(blog?.timeStamp);
    const formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setDate(formattedDate);
  }, [blog]);
  const handleSubmitComment = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      await addComment({
        comment: { content: data.comment, userId: userData._id },
      });
      await refetch();
      e.target.reset();
    } catch (error) {
      console.log(error.message);
      console.error(error);
      enqueueSnackbar({
        message: `Client Error: ${error.message}`,
        variant: "error",
      });
    }
  };
  return (
    <div className="respPx20 my-40">
      {fetchingBlog && <Loader text={"Loading Blog"} />}
      <p className="text-sage italic font-medium my-2">{date}</p>

      <div>
        <img
          src={blog?.image.filePath}
          alt={blog?.image.fileName}
          className="max-w-full h-[30rem] w-full object-cover "
        />
      </div>
      <div className="my-10 flex flex-col gap-10">
        <h1 className="text-5xl font-semibold capitalize">{blog?.title}</h1>
        {/* <p className="text-sage tracking-wide">{blog?.description}</p> */}
        <ReadOnlyEditor description={blog?.description} />
      </div>
      <div className="my-20">
        <h2 className="font-bold text-2xl text-oliveGreen">Comments</h2>
        <div className="my-10 flex flex-col gap-5">
          {blog?.comments.length === 0 && "No Comments"}
          {blog?.comments.map((comment, index) => {
            return <Comment comment={comment} key={index} />;
          })}
        </div>
        {localStorage?.getItem("authToken") && (
          <form onSubmit={handleSubmitComment} className="flex flex-col gap-3">
            <input
              type="text"
              id="text"
              className="py-3 px-3 outline-none border  focus:border-sage transitional"
              placeholder="Comment Here..."
              name="comment"
              required
            />
            <div>
              <button className="btn btn1Alt" disabled={fetching}>
                {fetching ? (
                  "Commenting..."
                ) : (
                  <>
                    <Telegram /> Send Comment
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        {!localStorage?.getItem("authToken") && (
          <div>
            <a
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </a>
            <span> to comment</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
const Comment = ({ comment }) => {
  return (
    <div className="border-b-2 border-dashed pb-2">
      <h6 className="font-semibold">@{comment.userId.displayName}</h6>
      <p className=" my-1 text-oliveGreen">{comment.content}</p>
    </div>
  );
};
