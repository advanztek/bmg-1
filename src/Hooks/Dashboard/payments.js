/* eslint-disable react-hooks/exhaustive-deps */
// hooks/usePayments.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";

/**
 * Hook to fetch user's own payments
 */
export const useUserPayments = (filters = {}) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await axios.get(
        `${BASE_SERVER_URL}/user/my-payments?${queryParams.toString()}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPayments(result.result.payments || []);
        setMeta(result.result.meta || {});
      } else {
        setError(result.message || "Failed to fetch payments");
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError(err.response?.data?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  }, [config, JSON.stringify(filters)]); // Serialize filters to avoid object reference issues

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]); // Now responds to filter changes

  return {
    payments,
    meta,
    loading,
    error,
    refetch: fetchPayments,
  };
};

/**
 * Hook to fetch all payments (Admin only)
 */
export const useAllPayments = (filters = {}) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [meta, setMeta] = useState({});
  const [error, setError] = useState(null);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      if (filters.user_id) queryParams.append("user_id", filters.user_id);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.currency) queryParams.append("currency", filters.currency);
      if (filters.payment_reference)
        queryParams.append("payment_reference", filters.payment_reference);
      if (filters.webhook_verified !== undefined)
        queryParams.append("webhook_verified", filters.webhook_verified);
      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);
      if (filters.min_amount)
        queryParams.append("min_amount", filters.min_amount);
      if (filters.max_amount)
        queryParams.append("max_amount", filters.max_amount);
      if (filters.limit) queryParams.append("limit", filters.limit);
      if (filters.page) queryParams.append("page", filters.page);
      if (filters.sort) queryParams.append("sort", filters.sort);
      if (filters.order) queryParams.append("order", filters.order);

      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payments?${queryParams.toString()}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPayments(result.result.payments || []);
        setMeta(result.result.meta || {});
      } else {
        setError(result.message || "Failed to fetch payments");
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError(err.response?.data?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  }, [config, filters]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    meta,
    loading,
    error,
    refetch: fetchPayments,
  };
};

/**
 * Hook to fetch a single payment
 */
export const useSinglePayment = (paymentId) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const fetchPayment = useCallback(async () => {
    if (!paymentId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/user/my-payments/${paymentId}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPayment(result.result.payment);
      } else {
        setError(result.message || "Failed to fetch payment");
      }
    } catch (err) {
      console.error("Error fetching payment:", err);
      setError(err.response?.data?.message || "Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  }, [paymentId, config]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  return {
    payment,
    loading,
    error,
    refetch: fetchPayment,
  };
};

/**
 * Hook to fetch a single payment (Admin)
 */
export const useAdminSinglePayment = (paymentId) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const fetchPayment = useCallback(async () => {
    if (!paymentId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payments/${paymentId}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPayment(result.result.payment);
      } else {
        setError(result.message || "Failed to fetch payment");
      }
    } catch (err) {
      console.error("Error fetching payment:", err);
      setError(err.response?.data?.message || "Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  }, [paymentId, config]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  return {
    payment,
    loading,
    error,
    refetch: fetchPayment,
  };
};

/**
 * Hook to fetch payment by reference
 */
export const usePaymentByReference = (reference) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  const fetchPayment = useCallback(async () => {
    if (!reference) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/my-payments/reference/${reference}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setPayment(result.result.payment);
      } else {
        setError(result.message || "Failed to fetch payment");
      }
    } catch (err) {
      console.error("Error fetching payment:", err);
      setError(err.response?.data?.message || "Failed to fetch payment");
    } finally {
      setLoading(false);
    }
  }, [reference, config]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  return {
    payment,
    loading,
    error,
    refetch: fetchPayment,
  };
};

/**
 * Hook to fetch user payment summary
 */
export const useUserPaymentSummary = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/user/my-payments/summary`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setSummary(result.result.summary || []);
      } else {
        setError(result.message || "Failed to fetch summary");
      }
    } catch (err) {
      console.error("Error fetching payment summary:", err);
      setError(err.response?.data?.message || "Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
  };
};

/**
 * Hook to fetch payment statistics (Admin only)
 */
export const usePaymentStats = (filters = {}) => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);

      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/payments/stats?${queryParams.toString()}`,
        config,
      );

      const result = response.data;

      if (result.code === 0) {
        setStats(result.result.stats || []);
      } else {
        setError(result.message || "Failed to fetch stats");
      }
    } catch (err) {
      console.error("Error fetching payment stats:", err);
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, [config, filters]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};
