import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useGetAdmin = (authToken) => {
  const { refetch } = useFetch(`${backendUrl}/api/admin/auth/`, "GET", {
    authToken,
  });
  return { getAdmin: refetch };
};

export default useGetAdmin;
