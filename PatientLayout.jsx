import { useState } from "react";
import Icon from "./Icon";
import AIAssistant from "./AIAssistant";

const navItems = [
  { page: "patientDashboard", label: "Dashboard", icon: "grid" },
  { page: "aiSpecialist", label: "Find Specialist", icon: "sparkle" },
  { page: "myAppointments", label: "My Appointments", icon: "calendar" },
  { page: "myPrescriptions", label: "My Prescriptions", icon: "pill" },
  { page: "myReports", label: "My Reports", icon: "file" },
  { page: "medicalHistory", label: "Medical History", icon: "activity" },
  { page: "patientPharmacy", label: "Pharmacy", icon: "building" },
  { page: "notifications", label: "Notifications", icon: "bell" },
  { page: "profile", label: "Profile", icon: "user" },
];

export default function PatientLayout({ nav, auth, patientProfile, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = auth;

  function handleLogout() {
    logout();
    nav.navigate("landing");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* ---------- Sidebar ---------- */}
      <aside className={`portal-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="flex items-center gap-8" style={{ padding: "22px 20px", borderBottom: "1px solid var(--navy-800)" }}>
          <span className="brand-mark"><Icon name="logo" size={16} style={{ color: "#FFAB9A" }} /></span>
          <span style={{ color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>MediVerse</span>
        </div>

        <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
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

      {/* ---------- Main ---------- */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <header className="portal-topbar">
          <button className="nav-toggle" style={{ display: "flex" }} onClick={() => setMobileOpen(true)}>
            <Icon name="menu" size={22} />
          </button>
          <div style={{ flex: 1 }} />
          <a href="#" onClick={(e) => { e.preventDefault(); nav.navigate("notifications"); }} className="icon-btn"><Icon name="bell" size={19} /></a>
          <a href="#" onClick={(e) => { e.preventDefault(); nav.navigate("profile"); }} className="flex items-center gap-8" style={{ marginLeft: 8 }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%", background: "var(--navy-100)", color: "var(--navy-800)",
              display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13,
            }}>
              {patientProfile.firstName ? patientProfile.firstName[0] : patientProfile.name[0]}
            </div>
          </a>
        </header>

        <main className="wrap" style={{ padding: "32px 28px", maxWidth: 1180 }}>
          {children}
        </main>
      </div>

      <AIAssistant nav={nav} />
    </div>
  );
}
