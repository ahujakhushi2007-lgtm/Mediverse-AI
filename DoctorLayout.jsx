import { useState } from "react";
import Icon from "./Icon";

const navItems = [
  { page: "doctorDashboard", label: "Dashboard", icon: "grid" },
  { page: "doctorPatients", label: "My Patients", icon: "users" },
];

export default function DoctorLayout({ nav, auth, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { session, logout } = auth;

  function handleLogout() {
    logout();
    nav.navigate("landing");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="stethoscope" size={16} style={{ color: "#FFAB9A" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>Doctor Portal</span>
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
          <div style={{ padding: "8px 14px 14px", color: "#6E8B7E", fontSize: 12.5 }}>Logged in as</div>
          <div style={{ padding: "0 14px 14px", color: "#fff", fontSize: 13.5, fontWeight: 600, marginTop: -10 }}>{session?.name}</div>
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
          <div style={{ flex: 1 }} />
          <div className="flex items-center gap-8">
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
              {session?.name?.replace("Dr. ", "")[0]}
            </div>
          </div>
        </header>
        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1180 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
