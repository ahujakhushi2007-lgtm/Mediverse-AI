import Icon from "../components/Icon";
import { demoAppointments, demoPrescriptions, demoReports, doctors } from "../data/mockData";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function PatientDashboard({ nav, patientProfile }) {
  const upcoming = demoAppointments.find((a) => a.status === "Upcoming");
  const upcomingDoctor = upcoming && doctors.find((d) => d.id === upcoming.doctorId);
  const activePrescriptions = demoPrescriptions.filter((p) => p.status === "Active").length;
  const newReports = demoReports.length;

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: "clamp(22px,3vw,28px)" }}>{greeting()} 👋</h1>
        <p className="muted" style={{ marginTop: 6 }}>Here's your healthcare overview.</p>
      </div>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div onClick={() => nav.navigate("aiSpecialist")} className="card card-pad card-hover" style={{ background: "linear-gradient(135deg,var(--navy-900),var(--navy-700))", color: "#fff", border: "none", cursor: "pointer" }}>
          <Icon name="sparkle" size={26} style={{ color: "var(--teal-300)", marginBottom: 12 }} />
          <h3 style={{ color: "#fff", fontSize: 17, marginBottom: 6 }}>Find a Specialist</h3>
          <p style={{ color: "#CFE3D6", fontSize: 13.5 }}>Describe your concern and get matched with the right department.</p>
        </div>
        <div onClick={() => nav.navigate("specialists")} className="card card-pad card-hover" style={{ cursor: "pointer" }}>
          <Icon name="calendar" size={26} style={{ color: "var(--teal-600)", marginBottom: 12 }} />
          <h3 style={{ fontSize: 17, marginBottom: 6 }}>Book an Appointment</h3>
          <p className="muted" style={{ fontSize: 13.5 }}>Browse all specialists and available time slots directly.</p>
        </div>
      </div>

      <div className="grid grid-4">
        <div className="card stat-card" style={{ gridColumn: "span 2" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 14 }}>
            <p style={{ fontWeight: 700, fontSize: 14.5 }}>Next Appointment</p>
            <span className="badge badge-teal">Upcoming</span>
          </div>
          {upcoming ? (
            <>
              <p style={{ fontWeight: 700, fontSize: 17 }}>{upcomingDoctor?.name}</p>
              <p className="muted" style={{ fontSize: 13.5, marginBottom: 12 }}>{upcomingDoctor?.specialty}</p>
              <div className="flex items-center gap-16" style={{ marginBottom: 16 }}>
                <span className="flex items-center gap-8" style={{ fontSize: 13.5 }}><Icon name="calendar" size={15} /> {formatDate(upcoming.date)}</span>
                <span className="flex items-center gap-8" style={{ fontSize: 13.5 }}><Icon name="clock" size={15} /> {upcoming.time}</span>
              </div>
              <div className="flex gap-8">
                <button onClick={() => nav.navigate("myAppointments")} className="btn btn-outline btn-sm">View</button>
                <button onClick={() => nav.navigate("myAppointments")} className="btn btn-ghost btn-sm">Reschedule</button>
                <button onClick={() => nav.navigate("myAppointments")} className="btn btn-ghost btn-sm" style={{ color: "var(--red-600)" }}>Cancel</button>
              </div>
            </>
          ) : (
            <EmptyMini text="No upcoming appointments." cta="Book one now" onClick={() => nav.navigate("specialists")} />
          )}
        </div>

        <StatCard icon="pill" tone="teal" title="Prescriptions" value={`${activePrescriptions} Active`} onClick={() => nav.navigate("myPrescriptions")} cta="View Prescriptions" />
        <StatCard icon="file" tone="amber" title="Reports" value={`${newReports} New`} onClick={() => nav.navigate("myReports")} cta="View Reports" />

        <div className="card stat-card" style={{ gridColumn: "span 2" }}>
          <p style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 14 }}>Patient ID</p>
          <p className="font-mono" style={{ fontSize: 22, fontWeight: 600, color: "var(--navy-900)", marginBottom: 16 }}>{patientProfile.patientId}</p>
          <button onClick={() => nav.navigate("profile")} className="btn btn-outline btn-sm">Show Patient ID</button>
        </div>

        <div className="card stat-card" style={{ gridColumn: "span 2" }}>
          <p style={{ fontWeight: 700, fontSize: 14.5, marginBottom: 14 }}>Medical Summary</p>
          <div className="flex gap-24" style={{ flexWrap: "wrap" }}>
            <MiniStat label="Blood Group" value={patientProfile.bloodGroup} />
            <MiniStat label="Allergies" value={patientProfile.allergies} />
            <MiniStat label="Age" value={ageFromDob(patientProfile.dob)} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, tone, title, value, onClick, cta }) {
  const tones = {
    teal: { bg: "var(--teal-50)", color: "var(--teal-600)" },
    amber: { bg: "var(--amber-100)", color: "var(--amber-600)" },
  };
  const t = tones[tone];
  return (
    <div className="card stat-card">
      <div className="stat-icon" style={{ background: t.bg, color: t.color }}><Icon name={icon} size={20} /></div>
      <p className="muted" style={{ fontSize: 13, marginBottom: 4 }}>{title}</p>
      <p style={{ fontWeight: 700, fontSize: 19, marginBottom: 16 }}>{value}</p>
      <button onClick={onClick} className="btn btn-outline btn-sm">{cta}</button>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 12 }}>{label}</p>
      <p style={{ fontWeight: 600, fontSize: 15 }}>{value}</p>
    </div>
  );
}

function EmptyMini({ text, cta, onClick }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 14, marginBottom: 12 }}>{text}</p>
      <button onClick={onClick} className="btn btn-primary btn-sm">{cta}</button>
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function ageFromDob(dob) {
  if (!dob) return "—";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000)) + " yrs";
}
