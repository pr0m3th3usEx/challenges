import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { getQueryClient } from "./lib/get-query-client.ts";
import router from "./app/index.tsx";

import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={getQueryClient()}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>,
);
