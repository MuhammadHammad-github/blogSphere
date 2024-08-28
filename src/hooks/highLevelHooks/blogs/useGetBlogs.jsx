import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useGetBlogs = () => {
  const { fetchedData } = useFetch(`${backendUrl}/api/admin/blogs/`);
  return { blogs: fetchedData };
};

export default useGetBlogs;
