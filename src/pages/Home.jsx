import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import useGetBlogs from "../hooks/highLevelHooks/blogs/useGetBlogs";
import {
  SentimentDissatisfied,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Loader from "../components/Loader";

const Home = () => {
  const [refetch, setRefetch] = useState(false);
  const { blogs, getBlogs, fetching } = useGetBlogs();
  useEffect(() => {
    if (!refetch) return;
    getBlogs();
    setRefetch(false);
  }, [refetch]);
  return (
    <div>
      <div className="bg-charcoal min-h-[33.333vh] flex flex-col gap-6 items-center justify-center text-white">
        <h1 className="text-7xl font-bold text-sand text-center">Our Blogs</h1>
        <p className="text-sand font-medium text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe est
          hic laboriosam repudiandae adipisci neque.
        </p>
      </div>
      <div className="my-20 respPx20 resp3ColGrid gap-8">
        {blogs?.map((blog, index) => {
          return <BlogCard blog={blog} key={index} setRefetch={setRefetch} />;
        })}
      </div>
      {blogs?.length === 0 && !fetching && (
        <div className="flex  flex-col items-center justify-center pb-20">
          <SentimentDissatisfiedOutlined className="!text-[8rem]" />
          <h4>No Blog Posted Yet!</h4>
        </div>
      )}
      {fetching && <Loader text={"Loading Blogs"} />}
    </div>
  );
};

export default Home;
