import { useState } from "react";
import Icon from "../components/Icon";
import FormField from "../components/FormField";

export default function AdminLogin({ nav, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginAsRole } = auth;

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your admin email and password.");
      return;
    }
    loginAsRole("admin", "Hospital Admin");
    nav.navigate("adminDashboard");
  }

  return (
    <section className="section wrap" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card card-pad" style={{ maxWidth: 420, width: "100%" }}>
        <div className="center" style={{ marginBottom: 26 }}>
          <div className="brand-mark" style={{ margin: "0 auto 14px" }}>
            <Icon name="shield" size={18} style={{ color: "#FFAB9A" }} />
          </div>
          <h1 style={{ fontSize: 24 }}>Hospital Administration</h1>
          <p className="muted" style={{ fontSize: 14.5, marginTop: 6 }}>Restricted access for authorized staff</p>
        </div>
        <form onSubmit={handleSubmit}>
          <FormField label="Admin Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@mediverse.health" required />
          <FormField label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          {error && <p style={{ color: "var(--red-600)", fontSize: 13.5, marginBottom: 14 }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        <p className="center muted" style={{ fontSize: 12.5, marginTop: 20 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); nav.navigate("patientLogin"); }} style={{ color: "var(--navy-700)", fontWeight: 600 }}>Back to Patient Login</a>
        </p>
      </div>
    </section>
  );
}
