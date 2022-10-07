import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import App from "App";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense fallback={null}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
