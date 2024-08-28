import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useLoginAdmin = (data) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/user/auth/login`,
    "POST",
    {},
    data,
    true,
    false
  );
  return { login: refetch };
};

export default useLoginAdmin;
