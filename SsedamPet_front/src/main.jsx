import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NoticeProvider } from "./contexts/NoticeContext.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});


const root = document.getElementById("root");
createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <NoticeProvider>
      <BrowserRouter>
        <App />
    </BrowserRouter>
    </NoticeProvider>
  </QueryClientProvider>,
);
