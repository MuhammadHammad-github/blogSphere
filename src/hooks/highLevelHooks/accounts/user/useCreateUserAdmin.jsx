import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useCreateUserAdmin = (data) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/user/auth/register`,
    "POST",
    {},
    data,
    true,
    false
  );
  return { createAccount: refetch };
};

export default useCreateUserAdmin;
