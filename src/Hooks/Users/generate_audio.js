/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../../Config/paths";
import { useUserContext } from "../../Contexts";
import { showToast } from "../../utils/toast";

/**
 * Hook: Generate speech audio from text
 * Returns base64 audio data on success
 */
function useGenerateTextToAudio() {
  const { config } = useUserContext();

  const generateAudio = async (payload) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/ai/text-to-voice`,
        payload,
        config
      );

      const { success, message, result, code } = response.data;
      console.log("Text → Audio response:", response.data);

      if (success === true && code === 0 && result?.audio) {
        return {
          audioBase64: result.audio,
          format: result.format || "mp3",
          model: result.model,
          message,
        };
      }

      showToast.error(message || "Failed to generate speech");
      return null;
    } catch (error) {
      console.error("Text to audio error:", error);

      const apiMessage =
        error?.response?.data?.message ||
        "Unexpected error occurred. Please try again.";

      showToast.error(apiMessage);
      return null;
    }
  };

  return generateAudio;
}

function useGenerateAudioToText() {
  const { config } = useUserContext();

  return async (data) => {
    try {
      const response = await axios.post(
        `${BASE_SERVER_URL}/ai/audio-to-text`,
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

const useFetchGeneratedAudios = () => {
  const { config } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_SERVER_URL}/ai/ai-images`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setImages(result.result);
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

  return { images, refetch: fetchData, loading };
};

export {
  useGenerateTextToAudio,
  useFetchGeneratedAudios,
  useGenerateAudioToText,
};
