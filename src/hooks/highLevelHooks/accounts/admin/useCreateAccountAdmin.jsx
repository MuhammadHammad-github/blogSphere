import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useCreateAccountAdmin = (data) => {
  const { refetch } = useFetch(
    `${backendUrl}/api/admin/auth/register`,
    "POST",
    {},
    data,
    true,
    false
  );
  return { createAccount: refetch };
};

export default useCreateAccountAdmin;
