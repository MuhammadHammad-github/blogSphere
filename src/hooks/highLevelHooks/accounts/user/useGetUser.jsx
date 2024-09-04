import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";
import { useEffect } from "react";

const useGetUser = (authToken) => {
  const { fetchedData, fetching, refetch } = useFetch(
    `${backendUrl}/api/user/auth/`,
    "GET",
    {
      authToken: authToken,
    },
    {},
    false,
    false
  );
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) refetch();
  }, []);
  useEffect(() => {
    if (!fetchedData) return;
    if (fetchedData?.action === "logout") {
      localStorage.removeItem("authToken");
    }
  }, [fetchedData]);
  return { userData: fetchedData?.account, refetch, fetching };
};

export default useGetUser;
