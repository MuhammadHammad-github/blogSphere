import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const useCreateBlog = () => {
  const navigate = useNavigate();
  const { refetch, fetching, fetchedData } = useFetch(
    `${backendUrl}/api/admin/blogs/create`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createBlog = (data) => {
    refetch(data);
  };
  useEffect(() => {
    if (fetchedData) {
      fetchedData.success && navigate("/");
    }
  }, [fetchedData]);
  return { createBlog, fetching };
};

export default useCreateBlog;
