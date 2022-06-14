import React from "react";
import { FaCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Loading = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`hero ${isAuthenticated ? "h-full" : "h-screen"}`}>
      <div className="hero-content text-center">
        <div className="max-w-md flex flex-col items-center">
          <FaCircle className="text-3xl text-secondary" />
          <p className="py-2">Please wait a bit</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
