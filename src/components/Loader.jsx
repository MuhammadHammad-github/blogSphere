import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = ({ text }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="flex-col gap-2 z-50 fixed top-0 left-0 w-full bg-charcoal bg-opacity-50"
    >
      <CircularProgress />
      <h6 className="font-semibold text-white">{text}...</h6>
    </div>
  );
};

export default Loader;
