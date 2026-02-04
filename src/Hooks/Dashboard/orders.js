/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useAddOrder() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/service`,
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
        showToast.error(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while adding Service.");
      }
      return false;
    }
  };
}

const useFetchOrders = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/orders`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setOrders(result.result);
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

  return { orders, refetch: fetchData, loading };
};

export function useGetOrderDetails(orderId, { load = true }) {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function getOrderDetails() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/order/${orderId}`,
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
    if (load) {
      getOrderDetails();
    }
  }, [load]);

  return { data, getOrderDetails, loading };
}

export function useAssignOrder() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);

  async function assignOrder(body) {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/assign/order`,
        body,
        config,
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
      console.log(error);
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while assigning order.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { loading, assignOrder };
}

export { useAddOrder, useFetchOrders };
