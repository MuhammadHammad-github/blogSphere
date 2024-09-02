import React, { useEffect, useState } from "react";
import RichEditor from "../components/RichEditor";
import { Create } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import useUpdateBlog from "../hooks/highLevelHooks/blogs/useUpdateBlog";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useGetOneBlog from "../hooks/highLevelHooks/blogs/useGetOneBlog";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog } = useGetOneBlog(id);
  const [description, setDescription] = useState(null);
  const [prevDescription, setPrevDescription] = useState(null);
  const [data, setData] = useState(null);
  const { updateBlog, fetching } = useUpdateBlog(id);
  const [callSave, setCallSave] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCallSave(true);
    const formData = new FormData(e.target);
    console.log(formData.get("image").size > 0);
    if (formData.get("image").size > 0) setData(formData);
    else {
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      setData(data);
    }
  };
  useEffect(() => {
    if (!blog) return;
    setPrevDescription(blog?.description);
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("shortDescription", blog.shortDescription);
    formData.append("description", blog.description);
    setData(formData);
  }, [blog]);
  useEffect(() => {
    const update = async () => {
      try {
        if (data) {
          let newData;
          if (data instanceof FormData) {
            data.append("description", JSON.stringify(description));
            updateBlog(data);
          } else {
            newData = data;
            newData.description = JSON.stringify(description);
            delete newData.image;
            updateBlog(newData);
          }
          setCallSave(false);
          navigate(`/blog/${blog._id}`);
        }
      } catch (error) {
        console.log(error.message);
        console.error(error);
        enqueueSnackbar({
          message: `Client Error: ${error.message}`,
          variant: "error",
        });
      }
    };
    if (!description || !data || fetching || !callSave) return;
    update();
  }, [description, data]);
  return (
    <div className="respPx20 my-20">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-8 my-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Enter Title </label>
            <input
              defaultValue={blog?.title}
              type="text"
              id="title"
              className="py-3 px-3 outline-none border  focus:border-sand transitional"
              placeholder="Enter Title (Max 55 Characters)"
              name="title"
              maxLength={55}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="description">Enter Description</label>
            <input
              defaultValue={blog?.shortDescription}
              type="text"
              id="description"
              className="py-3 px-3 outline-none border  focus:border-sand transitional"
              placeholder="Enter description (Max 150 Characters)"
              name="shortDescription"
              maxLength={150}
              required
            />
          </div>
          <div className="flex flex-col gap-3 col-span-2">
            <label htmlFor="image">Upload File</label>
            <input
              type="file"
              id="image"
              className="py-3 px-3 outline-none border  focus:border-sand transitional"
              placeholder="Upload Image"
              name="image"
              accept="image/*"
            />
          </div>
        </div>
        {blog && (
          <RichEditor
            callSave={callSave}
            setDescription={setDescription}
            defaultValue={prevDescription}
          />
        )}
        <button className="btn btn1Alt my-5">
          {fetching ? (
            "Submitting..."
          ) : (
            <>
              <Create /> Edit
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
