/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { useEffect, useState } from "react";
import { showToast } from "../../utils/toast";

function useCreateServiceTypes() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/service-type`,
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
      if (error.response.data?.error) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while adding service type.");
      }
      return false;
    }
  };
}

const useFetchServiceTypes = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/service-types`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setServiceTypes(result.result);
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

  return { serviceTypes, refetch: fetchData, loading };
};

export { useCreateServiceTypes, useFetchServiceTypes };
