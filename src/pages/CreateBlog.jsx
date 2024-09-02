import React, { useEffect, useState } from "react";
import RichEditor from "../components/RichEditor";
import { Create } from "@mui/icons-material";
import useCreateBlog from "../hooks/highLevelHooks/blogs/useCreateBlog";
import { enqueueSnackbar } from "notistack";

const CreateBlog = () => {
  const [description, setDescription] = useState(null);

  const [data, setData] = useState(null);
  const { createBlog, fetching } = useCreateBlog();
  const [callSave, setCallSave] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCallSave(true);
    const formData = new FormData(e.target);
    setData(formData);
  };
  useEffect(() => {
    const create = async () => {
      try {
        if (data) {
          data.append("description", JSON.stringify(description));
          console.log(data.get("image"));
          createBlog(data);
          setCallSave(false);
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
    if (!description || !data || fetching) return;
    create();
  }, [description, data]);
  return (
    <div className="respPx20 my-20">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-2 gap-8 my-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Enter Title </label>
            <input
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
              required
              accept="image/*"
            />
          </div>
        </div>

        <RichEditor callSave={callSave} setDescription={setDescription} />
        <button className="btn btn1Alt my-5">
          {fetching ? (
            "Submitting..."
          ) : (
            <>
              <Create /> Create
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
