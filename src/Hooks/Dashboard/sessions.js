import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Contexts";
import { BASE_SERVER_URL } from "../../Config/paths";
import { showToast } from "../../utils/toast";

const useFetchUserSessions = () => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const { config } = useUserContext();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `${BASE_SERVER_URL}/auth/activities`,
          config,
        );

        const result = response.data;
        console.log("result res:", result);

        if (result?.code === 0) {
          setSessions(result);
        }
      } catch (error) {
        console.error("Error fetching sessions:", error);
        showToast.error("Failed to fetch sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [config]);

  return { loading, sessions };
};

export { useFetchUserSessions };
