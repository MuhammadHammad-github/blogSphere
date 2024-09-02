import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";

const useCheckAdmin = () => {
  const { fetchedData } = useFetch(`${backendUrl}/api/admin/auth/checkAdmin`);
  return { adminData: fetchedData };
};

export default useCheckAdmin;
