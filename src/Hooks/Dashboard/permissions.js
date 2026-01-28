/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";
import { useState } from "react";

const useGetAdminPermissions = () => {
  const { config } = useUserContext();

  const [permissionsData, setPermissionsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPermissions = async (adminId) => {
    if (!adminId) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/admin/permission/${adminId}`,
        config,
      );

      const result = response.data;
      console.log("result res:", result);

      if (result?.code === 0) {
        setPermissionsData(result.result);
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
      showToast("Failed to fetch admin permissions", "error");
    } finally {
      setLoading(false);
    }
  };

  return { permissionsData, loading, getPermissions };
};

const useUpdateAdminPermissions = () => {
  const updatePermissions = async (adminId, permissionsData) => {
    try {
      const response = await axios.put(
        `${BASE_SERVER_URL}/admin/permission/${adminId}`,
        permissionsData,
      );

      showToast("Permissions updated successfully", "success");
      return response.data;
    } catch (error) {
      console.error("Error updating permissions:", error);
      showToast("Failed to update permissions", "error");
      throw error;
    }
  };

  return { updatePermissions };
};

export { useGetAdminPermissions, useUpdateAdminPermissions };
