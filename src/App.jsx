import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ClimateAlertsPage from "./pages/ClimateAlertsPage";
import CommunityFeedbackPage from "./pages/CommunityFeedbackPage";

// Placeholder for pages we haven't built yet, so the sidebar links still work.
function ComingSoon({ title }) {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas text-muted">
      {title} — coming soon
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/alerts" element={<ClimateAlertsPage />} />
        <Route path="/feedback" element={<CommunityFeedbackPage />} />
        <Route path="/analytics" element={<ComingSoon title="Analytics" />} />
      </Routes>
    </BrowserRouter>
  );
}