import { useState } from "react";
import Icon from "./Icon";

const navItems = [
  { page: "adminDashboard", label: "Dashboard", icon: "grid" },
  { page: "adminDoctors", label: "Doctors", icon: "stethoscope" },
  { page: "adminPatients", label: "Patients", icon: "users" },
  { page: "adminAppointments", label: "Appointments", icon: "calendar" },
  { page: "adminPharmacy", label: "Pharmacy", icon: "crossMed" },
  { page: "adminAnalytics", label: "Analytics", icon: "activity" },
];

export default function AdminLayout({ nav, auth, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = auth;

  function handleLogout() {
    logout();
    nav.navigate("landing");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="shield" size={16} style={{ color: "#FFAB9A" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 14 }}>MediVerse Admin</span>
        </div>
        <nav style={{ padding: "16px 12px", flex: 1 }}>
          {navItems.map((item) => (
            <a
              key={item.page} href="#"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); nav.navigate(item.page); }}
              className={`sidebar-link ${nav.page === item.page ? "active" : ""}`}
            >
              <Icon name={item.icon} size={17} /> {item.label}
            </a>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: "1px solid var(--navy-800)" }}>
          <button onClick={handleLogout} className="sidebar-link" style={{ width: "100%", background: "none", border: "none", cursor: "pointer" }}>
            <Icon name="logout" size={17} /> Logout
          </button>
        </div>
      </aside>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header className="portal-topbar">
          <button className="nav-toggle" style={{ display: "flex" }} onClick={() => setMobileOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
        </header>
        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1220 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
