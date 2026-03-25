import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdsListPage } from "./pages/AdsListPage";
import { AdEditPage } from "./pages/AdEditPage";
import { AdViewPage } from "./pages/AdViewPage";
import "./styles/fonts.css";
import "./styles/index.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
            fontFamily: "'Roboto', sans-serif",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/ads" replace />} />

            <Route path="/ads" element={<AdsListPage />} />
            <Route path="/ads/:id" element={<AdViewPage />} />
            <Route path="/ads/:id/edit" element={<AdEditPage />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
