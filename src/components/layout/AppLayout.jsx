import Sidebar from "./Sidebar";
import Footer from "./Footer";

// The frame every page lives in: sidebar on the left, then a column holding
// the page's TopBar, its content, and the shared Footer.
// Each page passes its own `topBar` (they differ per page) and its content as children.
export default function AppLayout({ topBar, user, children }) {
  return (
    <div className="flex min-h-screen bg-canvas text-ink">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className="flex-1 px-8 pb-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}