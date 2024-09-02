import useFetch from "../../../lowLevelHooks/useFetch";
import { backendUrl } from "../../../../utils/backendUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLoginUser = (data) => {
  const navigate = useNavigate();
  const { refetch, fetchedData, fetching } = useFetch(
    `${backendUrl}/api/user/auth/login`,
    "POST",
    {},
    {},
    true,
    false
  );

  const login = (data) => refetch(data);
  useEffect(() => {
    if (fetchedData) {
      localStorage.setItem("authToken", fetchedData.authToken);
      navigate("/");
    }
  }, [fetchedData]);
  return { login, fetching, fetchedData };
};

export default useLoginUser;
