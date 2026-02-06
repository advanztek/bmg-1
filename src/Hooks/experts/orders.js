import axios from "axios";
import { useUserContext } from "../../Contexts";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../../Config/paths";
import { showToast } from "../../utils/toast";

export function useGetExpertOrders() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function getExpertOrders() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/expert/assigned/orders`,
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
    getExpertOrders();
  }, []);

  return { data, getExpertOrders, loading };
}

export function useRespondToOrder() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);

  async function respondToOrder(body) {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/expert/respond`,
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

  return { loading, respondToOrder };
}

export function useSubmitOrder() {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);

  async function submitOrder(body) {
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/expert/submits/order`,
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

  return { loading, submitOrder };
}

export function useGetExpertOrderSubmissions(orderItemId) {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function getExpertOrderSubmissions() {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/expert/completed/orders/?order_item_id=${orderItemId}`,
        config,
      );

      const result = response.data;

      console.log("Order Submissions ");
      console.log(result);

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
    getExpertOrderSubmissions();
  }, [orderItemId]);

  return { data, getExpertOrderSubmissions, loading };
}
