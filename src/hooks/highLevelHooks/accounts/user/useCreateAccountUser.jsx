import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useCreateAccountUser = () => {
  const { refetch, fetching, fetchedData } = useFetch(
    `${backendUrl}/api/user/auth/register`,
    "POST",
    {},
    {},
    true,
    false
  );
  const createAccount = (data) => refetch(data);
  return { createAccount, fetching, fetchedData };
};

export default useCreateAccountUser;
