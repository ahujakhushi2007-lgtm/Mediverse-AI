import Icon from "./Icon";

export default function Footer({ nav }) {
  function go(page, params) {
    nav.navigate(page, params);
  }
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid grid-4" style={{ marginBottom: 8 }}>
          <div>
            <div className="brand" style={{ color: "#fff", marginBottom: 14 }}>
              <span className="brand-mark"><Icon name="logo" size={18} style={{ color: "#FFAB9A" }} /></span>
              MediVerse
            </div>
            <p style={{ color: "#AFC7BC", fontSize: 14, maxWidth: 260 }}>
              Your health. One connected experience — specialists, appointments, prescriptions and records in a single platform.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); go("specialists"); }}>Find a Specialist</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("departments"); }}>Departments</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("patientLogin"); }}>Patient Login</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("patientRegister"); }}>Create Account</a>
          </div>
          <div>
            <h4>Hospital</h4>
            <a href="#" onClick={(e) => { e.preventDefault(); go("about"); }}>About MediVerse</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("howItWorks"); }}>How It Works</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("contact"); }}>Contact Us</a>
            <a href="#" onClick={(e) => { e.preventDefault(); go("contact", { scrollTo: "emergency" }); }}>Emergency Info</a>
          </div>
          <div>
            <h4>Contact</h4>
            <span style={{ color: "#AFC7BC", fontSize: 14, display: "block", padding: "5px 0" }}>Model Town, Ludhiana, Punjab</span>
            <span style={{ color: "#AFC7BC", fontSize: 14, display: "block", padding: "5px 0" }}>+91 161 400 1000</span>
            <span style={{ color: "#AFC7BC", fontSize: 14, display: "block", padding: "5px 0" }}>care@mediverse.health</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MediVerse Hospital. Demo platform — fictional data only.</span>
          <span>Privacy Policy · Terms of Use · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
