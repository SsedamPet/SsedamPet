import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./configs/reactQueryConfig.js";

const root = document.getElementById("root");
createRoot(root).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>,
);
