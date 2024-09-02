import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useGetOneBlog = (blogId) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `${backendUrl}/api/admin/blogs/one`,
    "GET",
    {
      id: blogId,
    }
  );
  return { blog: fetchedData?.item, fetchingBlog: fetching, refetch };
};

export default useGetOneBlog;
