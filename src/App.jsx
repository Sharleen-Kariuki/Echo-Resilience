import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import RequireAuth from "./components/auth/RequireAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AlertHistoryPage from "./pages/AlertHistoryPage";
import ClimateAlertsPage from "./pages/ClimateAlertsPage";
import CommunityFeedbackPage from "./pages/CommunityFeedbackPage";
import FeedbackMapPage from "./pages/FeedbackMapPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import AnalyticsPage from "./pages/AnalyticsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/alerts" element={<RequireAuth><AlertHistoryPage /></RequireAuth>} />
          <Route path="/alerts/new" element={<RequireAuth><ClimateAlertsPage /></RequireAuth>} />
          <Route path="/feedback" element={<RequireAuth><CommunityFeedbackPage /></RequireAuth>} />
          <Route path="/feedback-map" element={<RequireAuth><FeedbackMapPage /></RequireAuth>} />
          <Route path="/communities" element={<RequireAuth><CommunitiesPage /></RequireAuth>} />
          <Route path="/analytics" element={<RequireAuth><AnalyticsPage /></RequireAuth>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
