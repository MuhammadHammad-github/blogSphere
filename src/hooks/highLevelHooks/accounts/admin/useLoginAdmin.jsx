import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginAdmin = () => {
  const navigate = useNavigate();
  const { refetch, fetchedData, fetching } = useFetch(
    `${backendUrl}/api/admin/auth/login`,
    "POST",
    {},
    {},
    true,
    false
  );
  const login = (data) => refetch(data);
  useEffect(() => {
    if (fetchedData) {
      localStorage.setItem("authTokenAdmin", fetchedData.authToken);
      fetchedData.authToken && navigate("/createBlog");
    }
  }, [fetchedData]);
  return { login, fetchedData, fetching };
};

export default useLoginAdmin;
