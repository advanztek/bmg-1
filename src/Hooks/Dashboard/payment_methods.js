/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddPayMethods() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/payment/method`,
        data,
        config
      );

      const result = response.data;
      console.log(result);
      if (result?.code === 0) {
        showToast.success(result.message);
        return true;
      }
      if (result?.code !== 0) {
        showToast.error(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error !== 0) {
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("An error occurred while creating method.");
      }
      return false;
    }
  };
}

const useFetchPayMethods = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payment-methods`,
        config
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setMethods(result.result);
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

  return { methods, refetch: fetchData, loading };
};

function useGetPayMethod() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [methodData, setMethodData] = useState(null);

  const getMethod = async (methodId) => {
    if (!methodId) {
      console.error("No method ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching method with ID:", methodId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payment-method/${methodId}`,
        config
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setMethodData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMethodData(null);
    } finally {
      setLoading(false);
    }
  };

  return { methodData, loading, getMethod };
}

export { useAddPayMethods, useFetchPayMethods, useGetPayMethod };
