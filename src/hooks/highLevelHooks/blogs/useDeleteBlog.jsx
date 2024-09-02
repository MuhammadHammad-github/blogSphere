import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useDeleteBlog = (blogId) => {
  const { refetch, fetching } = useFetch(
    `${backendUrl}/api/admin/blogs/delete`,
    "DELETE",
    {
      id: blogId,
    },
    {},
    true,
    false
  );

  return { deleteBlog: refetch, fetching };
};

export default useDeleteBlog;
