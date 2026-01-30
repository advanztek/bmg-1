/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState, useEffect } from "react";

const useFetchMailRecipients = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/mails/recipients`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setRecipients(result.result.results);
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

  return { recipients, refetch: fetchData, loading };
};

const useFetchMails = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [mails, setMails] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/all-mails`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result.code === 0) {
        setMails(result?.result);
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

  return { mails, refetch: fetchData, loading };
};

function useSendMails() {
  const { config } = useUserContext();
  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/admin/send/email`,
        data,
        config,
      );
      const result = response.data;

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
        showToast.error(error?.response?.data?.message);
      } else {
        showToast.error("An error occurred while sending mails.");
      }
      return false;
    }
  };
}

function useGetMail() {
  const [loading, setLoading] = useState(false);
  const { config } = useUserContext();
  const [mailData, setMailData] = useState(null);

  const getMail = async (mailId) => {
    if (!mailId) {
      console.error("No  ID provided");
      return;
    }

    setLoading(true);
    console.log("Fetching with ID:", mailId);

    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/email/${mailId}`,
        config,
      );

      const result = response.data;
      console.log("single res:", result);

      if (result?.code === 0) {
        setMailData(result?.result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMailData(null);
    } finally {
      setLoading(false);
    }
  };

  return { mailData, loading, getMail };
}

const useDeleteMail = () => {
  return async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_SERVER_URL}/admin/delete/mail/${id}`,
        {},
      );

      const result = response.data;

      showToast.success(result.message);
      return result;
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      showToast.error("error occurred while deleting mail.");
      throw error;
    }
  };
};

export {
  useFetchMailRecipients,
  useFetchMails,
  useSendMails,
  useGetMail,
  useDeleteMail,
};
