import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useGetAdmin = (authToken) => {
  const { fetchedData, fetching } = useFetch(
    `${backendUrl}/api/admin/auth/`,
    "GET",
    {
      authToken,
    }
  );
  return { adminData: fetchedData, fetching };
};

export default useGetAdmin;
