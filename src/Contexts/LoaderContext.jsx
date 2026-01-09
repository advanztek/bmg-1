/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  const showLoader = (loaderTitle = "") => {
    setTitle(loaderTitle);
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
    setTitle("");
  };

  return (
    <LoaderContext.Provider
      value={{
        loading,
        title,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};
