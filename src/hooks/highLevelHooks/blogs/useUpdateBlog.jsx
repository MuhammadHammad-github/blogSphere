import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useCreateBlog = (data, blogId) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/admin/blogs/update`,
    "PUT",
    {
      id: blogId,
    },
    data,
    true,
    false
  );
  return { updateBlog: refetch };
};

export default useCreateBlog;
