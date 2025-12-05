import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import VisitPage from "./pages/VisitPage";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "items", element: <ListPage /> },
      { path: "items/:id", element: <DetailPage /> },
      { path: "items/:id/visits", element: <VisitPage /> },
      { path: "items/:id/edit", element: <EditPage mode="edit" /> },
      { path: "new", element: <EditPage mode="create" /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
