/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

function useCreateCoupon() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/create/coupon`,
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
        showToast.success(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("An error occurred while creating coupon.");
      }
      return false;
    }
  };
}

const useFetchCoupons = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/coupons`,
        config,
      );

      const result = response.data;

      console.log(" Response:", result);

      if (result.code === 0) {
        setCoupons(result.result);
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

  return { coupons, refetch: fetchData, loading };
};

function useGetCoupon() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [data, setData] = useState(null);

  const getCoupon = async (couponId) => {
    if (!couponId) {
      console.error("No faq ID provided");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/coupon/${couponId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, getCoupon };
}

const useDeleteCoupon = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/coupon/${id}`,
        {},
      );

      const result = response.data;

      console.log("Delete Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting coupon.");
      throw error;
    }
  };
};

const useUpdateCoupon = () => {
  return async (id, data) => {
    if (!id || typeof id === "object") {
      console.error("Invalid FAQ ID:", id);
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/update/coupon/${id}`,
        data,
      );

      const result = response.data;
      console.log("Update Response:", result);

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error(
        error?.response?.data?.message ||
          "Error occurred while updating coupon.",
      );
    }
  };
};

export {
  useCreateCoupon,
  useFetchCoupons,
  useGetCoupon,
  useDeleteCoupon,
  useUpdateCoupon,
};
