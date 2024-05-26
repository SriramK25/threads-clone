// LOCAL FILES
import axiosInstance from "../axios/axiosInstance";

// REACT HOOKS
import { useState, useEffect } from "react";

function useGetDataByURL(url) {
  // REACT HOOKS VARIABLES
  const [response, setResponse] = useState({
    // RESPONSE FROM API
    data: {},

    // LOADING STATE
    isLoading: true,

    // CONVENIENCE VARIABLE
    isError: false,

    // ACTUAL ERROR OBJECT
    error: null,
  });

  // RUNS WHEN URL CHANGES
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log("URL fetcher running");
        // START LOADING
        setResponse((res) => ({ ...res, isLoading: true }));

        // FETCH WITH URL
        const response = await axiosInstance.get(url);

        console.log(response);

        if (response.status === 200) {
          // UPDATE DATA
          setResponse((res) => ({ ...res, data: response.data }));
        }
      } catch (error) {
        //  IF ERROR UPDATE ERROR & ISERROR
        setResponse((res) => ({ ...res, isError: true, error }));
      } finally {
        // STOP LOADING
        setResponse((res) => ({ ...res, isLoading: false }));
      }
    }

    fetchData();
  }, [url]);

  return response;
}

export default useGetDataByURL;
