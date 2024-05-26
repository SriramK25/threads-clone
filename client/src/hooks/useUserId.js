// DEPRECATED FILE

import { useState, useEffect } from "react";
import axiosInstance from "../axios/axiosInstance";

function useUserId(id) {
  const [response, setResponse] = useState({
    data: {},
    isLoading: false,
    isError: false,
    error: null,
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        setResponse((res) => ({ ...res, isLoading: true }));
        const response = await axiosInstance.get(`/users/profile/${id}`);

        console.log(response);

        if (response.status === 200) {
          setResponse((res) => ({ ...res, data: response.data.user }));
        }
      } catch (error) {
        setResponse((res) => ({ ...res, isError: true, error }));
      } finally {
        setResponse((res) => ({ ...res, isLoading: false }));
      }
    }

    fetchUser();
  }, [id]);

  return response;
}

export default useUserId;
