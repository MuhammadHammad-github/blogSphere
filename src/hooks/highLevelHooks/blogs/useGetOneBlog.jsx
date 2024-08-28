import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useGetOneBlog = (blogId) => {
  const { fetchedData } = useFetch(`${backendUrl}/api/admin/blogs/one`, "GET", {
    id: blogId,
  });
  return { blogs: fetchedData };
};

export default useGetOneBlog;
