import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteBlog from "../hooks/highLevelHooks/blogs/useDeleteBlog";
import { Create, Delete } from "@mui/icons-material";

const BlogCard = ({ blog, setRefetch }) => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { deleteBlog, fetching } = useDeleteBlog(blog._id);
  useEffect(() => {
    const authTokenAdmin = localStorage.getItem("authTokenAdmin");
    if (authTokenAdmin) setIsAdminLoggedIn(true);
  }, []);
  return (
    <div className="bg-sand transitional text-charcoal shadow hover:shadow-xl rounded flex flex-col h-full">
      <div onClick={() => navigate(`/blog/${blog._id}`)}>
        <img
          src={blog.image?.filePath}
          alt="blogImage"
          className="max-w-full h-56 object-cover w-full cursor-pointer"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow justify-between h-full border gap-2">
        <h3
          onClick={() => navigate(`/blog/${blog._id}`)}
          className="text-2xl font-semibold cursor-pointer"
        >
          {blog.title}
        </h3>
        <p>{blog.shortDescription}</p>
        {localStorage?.getItem("authTokenAdmin") && (
          <div className="flex justify-end gap-2 mt-auto">
            <button
              className="btn btn1Alt"
              onClick={() => navigate(`/editBlog/${blog._id}`)}
              type="button"
            >
              <Create /> Edit
            </button>
            <button
              onClick={async () => {
                await deleteBlog();
                setRefetch(true);
              }}
              className="btn btn1Alt"
              type="button"
            >
              {fetching ? (
                "Deleting..."
              ) : (
                <>
                  <Delete /> Delete
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
