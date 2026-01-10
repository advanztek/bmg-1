/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";

function useGenerateImage() {
  const { config } = useUserContext();

  console.log("app configurations:", config);

  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/ai/text-to-image`,
        data,
        config
      );

      const result = response.data;
      console.log("generated image:", result);

      if (result?.strategy || result?.message || result?.status === true) {
        return result;
      }

      if (result?.error || result?.message) {
        const msg = result?.message || result?.error;
        showToast.error(msg);
        return false;
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      if (error.response.data?.code !== 0) {
        showToast.error(error.response.data.message);
      } else {
        showToast.error("Unexpected error occurred. Please try again.");
      }
      return false;
    }
  };
}
export { useGenerateImage };
