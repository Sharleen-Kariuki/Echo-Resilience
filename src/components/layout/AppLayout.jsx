import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppLayout({ topBar, user, children, fitViewport = false }) {
  return (
    <div className={`flex bg-canvas text-ink ${fitViewport ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      <Sidebar user={user} />
      <div className={`flex min-w-0 flex-1 flex-col ${fitViewport ? "overflow-hidden" : ""}`}>
        {topBar}
        <main className={`flex-1 px-8 pb-6 ${fitViewport ? "min-h-0 overflow-hidden" : ""}`}>
          {children}
        </main>
        {!fitViewport && <Footer />}
      </div>
    </div>
  );
}
