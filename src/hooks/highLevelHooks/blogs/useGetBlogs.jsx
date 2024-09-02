import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useGetBlogs = () => {
  const { fetchedData, fetching, refetch } = useFetch(
    `${backendUrl}/api/admin/blogs/`
  );
  return { blogs: fetchedData?.items, fetching, getBlogs: refetch };
};

export default useGetBlogs;
