import { useState } from "react";
import Icon from "./Icon";

const links = [
  { page: "landing", label: "Home" },
  { page: "departments", label: "Services" },
  { page: "specialists", label: "Specialists" },
  { page: "howItWorks", label: "How It Works" },
  { page: "about", label: "About" },
  { page: "contact", label: "Contact" },
];

const languages = [
  { code: "EN", label: "English" },
  { code: "HI", label: "हिंदी" },
  { code: "PA", label: "ਪੰਜਾਬੀ" },
];

const dashboardPageByRole = {
  patient: "patientDashboard",
  doctor: "doctorDashboard",
  pharmacist: "pharmacyDashboard",
  admin: "adminDashboard",
};

export default function Navbar({ nav, auth }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const { session } = auth;

  function go(page, params) {
    setOpen(false);
    nav.navigate(page, params);
  }

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
        <a href="#" className="brand" onClick={(e) => { e.preventDefault(); go("landing"); }}>
          <span className="brand-mark">
            <Icon name="logo" size={18} style={{ color: "#FFAB9A" }} />
          </span>
          MediVerse
        </a>

        <nav className="nav-links">
          {links.map((l) => (
            <a
              key={l.page}
              href="#"
              onClick={(e) => { e.preventDefault(); go(l.page); }}
              className={nav.page === l.page ? "active" : ""}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-switcher">
            <button
              className="btn btn-ghost btn-sm"
              title="Language"
              style={{ display: "flex" }}
              onClick={() => setLangOpen((o) => !o)}
            >
              <Icon name="globe" size={16} /> {language} <Icon name="chevronDown" size={14} />
            </button>
            {langOpen && (
              <div className="lang-menu fade-up">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    className={`lang-option ${language === l.code ? "active" : ""}`}
                    onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Icon name="check" size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          {session ? (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); go(dashboardPageByRole[session.role] || "landing"); }}
              className="btn btn-primary btn-sm"
            >
              My Dashboard
            </a>
          ) : (
            <>
              <a href="#" onClick={(e) => { e.preventDefault(); go("patientLogin"); }} className="btn btn-outline btn-sm">Login</a>
              <a href="#" onClick={(e) => { e.preventDefault(); go("patientRegister"); }} className="btn btn-primary btn-sm">Get Started</a>
            </>
          )}
          <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>

      <div className={`mobile-menu wrap ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.page} href="#" onClick={(e) => { e.preventDefault(); go(l.page); }}>{l.label}</a>
        ))}
      </div>
    </header>
  );
}
