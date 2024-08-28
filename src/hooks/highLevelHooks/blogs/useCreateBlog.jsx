import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useCreateBlog = (data) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/admin/blogs/create`,
    "POST",
    {},
    data,
    true,
    false
  );
  return { createBlog: refetch };
};

export default useCreateBlog;
