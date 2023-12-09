import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import router from "./router";
import { TaskProvider } from "./contexts/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(

      <AuthProvider>
         <TaskProvider>
            <RouterProvider router={router} />
         </TaskProvider>
      </AuthProvider>

);
