import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./Routes/routes.jsx";
import AuthProvider from "./Context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="w-[90%] mx-auto  bg-[#ffbdf7]">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
