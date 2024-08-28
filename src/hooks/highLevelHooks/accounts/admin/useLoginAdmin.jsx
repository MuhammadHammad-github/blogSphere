import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useLoginAdmin = (data) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/admin/auth/login`,
    "POST",
    {},
    data,
    true,
    false
  );
  return { login: refetch };
};

export default useLoginAdmin;
