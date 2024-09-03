import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useUpdateBlog = (blogId) => {
  const { refetch, fetching } = useFetch(
    `${backendUrl}/api/admin/blogs/update`,
    "PUT",
    {
      id: blogId,
    },
    {},
    true,
    false
  );
  const updateBlog = async (data) => await refetch(data);
  return { updateBlog, fetching };
};

export default useUpdateBlog;
