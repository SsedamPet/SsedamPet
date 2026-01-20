import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Global, css } from '@emotion/react';

import MainHomePage from "./pages/mainhome/mainhome.jsx"; 

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard', sans-serif;
  }
`;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Global styles={globalStyles} />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainHomePage />} />
                    <Route path="/main" element={<MainHomePage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>
);