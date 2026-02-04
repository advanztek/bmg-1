import axios from "axios";
import { useUserContext } from "../../Contexts";
import { useEffect, useState } from "react";
import { BASE_SERVER_URL } from "../../Config/paths";

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
