/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

const useFetchUsers = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/all-customers`,
        config,
      );

      const result = response.data;
      console.log(" Response:", result);

      if (result.code === 0) {
        setUsers(result.result);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { users, refetch: fetchData, loading };
};

function useAddUser() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/add/customers`,
        data,
        config,
      );

      const result = response.data;
      console.log(result);

      if (result?.code === 0) {
        showToast.success(result.message);
        return true;
      }
      if (result?.code !== 0) {
        showToast.error(
          result?.message?.message || "An error occured, please try again...",
        );
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error !== 0) {
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("An error occurred while adding Customer.");
      }
      return false;
    }
  };
}

const useUpdateUserStatus = () => {
  return async (data, id) => {
    if (!id || typeof id === "object") {
      console.error("Invalid user ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/user/status/${id}`,
        data,
      );

      const result = response.data;
      console.log("Update Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error(
        error?.response?.data?.message || "Error occurred while updating.",
      );
    }
  };
};

export function useGetUserDetails(userId) {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function getUserDetails() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/customer/${userId}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setData(result.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  return { data, getUserDetails, loading };
}

export { useAddUser, useFetchUsers, useUpdateUserStatus };
