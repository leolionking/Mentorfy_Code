import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
// import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RecoilRoot>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
      <App />
      {/* <RouterProvider router={router} /> */}
    </RecoilRoot>
  </>
);
