/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toast";

function useCreateSubPlan() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/subscription-plans`,
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
        showToast.success(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while creating Subscription plan.");
      }
      return false;
    }
  };
}

const useFetchSubPlans = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/subscription-plans`,
        config
      );

      const result = response.data;
      console.log("plans:", result);

      if (result.code === 0) {
        setPlans(result.result);
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

  return { plans, refetch: fetchData, loading };
};

export { useCreateSubPlan, useFetchSubPlans };
