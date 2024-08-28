import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const useFetch = (
  api,
  method = "GET",
  headers,
  body = {},
  showAlert,
  autoCall = true
) => {
  const defaultHeaders = { "content-type": "application/json" };
  const [fetchedData, setFetchedData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(api, {
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        ...(method !== "GET" && { body: JSON.stringify(body) }),
      });

      const json = await response.json();
      setFetchedData(json);
      showAlert &&
        enqueueSnackbar({
          message: json.message,
          variant: response.ok ? "success" : "error",
        });
    } catch (error) {
      console.log(
        "An error occurred in fetchData in useFetch hook",
        error.message
      );
      console.error(error);
    }
  };
  useEffect(() => {
    autoCall && fetchData();
  }, []);
  return { fetchedData, refetch: fetchData };
};

export default useFetch;
