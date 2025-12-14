"use client";

import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color="#1635bdd6f"
      cssOverride={override}
      size={150}
      aria-label="loading"
    />
  );
};

export default LoadingPage;
