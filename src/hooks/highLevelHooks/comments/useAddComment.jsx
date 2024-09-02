import useFetch from "../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../utils/backendUrl";

const useAddComment = (blogId) => {
  const { refetch, fetching } = useFetch(
    `${backendUrl}/api/user/comments/add`,
    "PUT",
    {
      id: blogId,
    },
    {},
    false,
    false
  );
  const addComment = async (data) => await refetch(data);
  return { addComment, fetching };
};

export default useAddComment;
