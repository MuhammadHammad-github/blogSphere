import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useCreateAccountAdmin = () => {
  const { refetch, fetching } = useFetch(
    `${backendUrl}/api/admin/auth/register`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createAccount = (data) => refetch(data);
  return { createAccount, fetching };
};

export default useCreateAccountAdmin;
