import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./components/ThemeProvider"; // ✅ Import ThemeProvider
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider> {/* ✅ Wrap App inside ThemeProvider */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
