import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";
import { useEffect } from "react";

const useGetAdmin = (authToken) => {
  const { fetchedData, fetching } = useFetch(
    `${backendUrl}/api/admin/auth/`,
    "GET",
    {
      authToken,
    }
  );
  useEffect(() => {
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authTokenAdmin");
    }
  }, [fetchedData]);
  return { adminData: fetchedData, fetching };
};

export default useGetAdmin;
