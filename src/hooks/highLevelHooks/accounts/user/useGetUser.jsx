import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useGetUser = (authToken) => {
  const { fetchedData } = useFetch(`${backendUrl}/api/user/auth/`, "GET", {
    authToken,
  });
  return { userData: fetchedData };
};

export default useGetUser;
