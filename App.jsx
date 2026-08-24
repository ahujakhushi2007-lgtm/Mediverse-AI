import { useState } from "react";

import PublicLayout from "./components/PublicLayout";
import PatientLayout from "./components/PatientLayout";
import DoctorLayout from "./components/DoctorLayout";
import AdminLayout from "./components/AdminLayout";

import Landing from "./pages/Landing";
import Specialists from "./pages/Specialists";
import DoctorProfile from "./pages/DoctorProfile";
import Departments from "./pages/Departments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";

import PatientLogin from "./pages/PatientLogin";
import PatientRegister from "./pages/PatientRegister";
import PatientDashboard from "./pages/PatientDashboard";
import AISpecialistFinder from "./pages/AISpecialistFinder";
import BookAppointment from "./pages/BookAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";
import MyAppointments from "./pages/MyAppointments";
import MyPrescriptions from "./pages/MyPrescriptions";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import MyReports from "./pages/MyReports";
import ReportViewer from "./pages/ReportViewer";
import MedicalHistory from "./pages/MedicalHistory";
import PatientPharmacy from "./pages/PatientPharmacy";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import DoctorLogin from "./pages/DoctorLogin";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorPatientRecord from "./pages/DoctorPatientRecord";
import PrescriptionNew from "./pages/PrescriptionNew";

import PharmacyLogin from "./pages/PharmacyLogin";
import PharmacyDashboard from "./pages/PharmacyDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";
import AdminAppointments from "./pages/AdminAppointments";
import AdminPharmacy from "./pages/AdminPharmacy";
import AdminAnalytics from "./pages/AdminAnalytics";

import { demoPatient, demoNotifications } from "./data/mockData";

export default function App() {
  // ---------- Navigation state (replaces react-router-dom) ----------
  const [page, setPage] = useState("landing");
  const [params, setParams] = useState({});

  // ---------- Auth state (replaces useAuth + localStorage) ----------
  const [session, setSession] = useState(null);

  // ---------- Shared app data (replaces useLocalStorage) ----------
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState(demoNotifications);
  const [dispensed, setDispensed] = useState([]);

  function navigate(nextPage, nextParams = {}) {
    setPage(nextPage);
    setParams(nextParams);
    window.scrollTo(0, 0);
  }

  function loginAsPatient() {
    setSession({ role: "patient", id: demoPatient.patientId, name: demoPatient.name });
  }
  function loginAsDoctor(doctorId, name) {
    setSession({ role: "doctor", id: doctorId, name });
  }
  function loginAsRole(role, name) {
    setSession({ role, id: role, name });
  }
  function logout() {
    setSession(null);
  }

  const nav = { page, params, navigate };
  const auth = { session, loginAsPatient, loginAsDoctor, loginAsRole, logout };

  // ---------- Public marketing site ----------
  const publicPages = {
    landing: <Landing nav={nav} />,
    specialists: <Specialists nav={nav} />,
    doctorProfile: <DoctorProfile nav={nav} />,
    departments: <Departments nav={nav} />,
    about: <About />,
    contact: <Contact />,
    howItWorks: <HowItWorks nav={nav} />,
  };

  if (publicPages[page]) {
    return <PublicLayout nav={nav} auth={auth}>{publicPages[page]}</PublicLayout>;
  }

  // ---------- Auth screens ----------
  if (page === "patientLogin") {
  return (
    <PublicLayout nav={nav} auth={auth}>
      <PatientLogin nav={nav} auth={auth} />
    </PublicLayout>
  );
}

if (page === "patientRegister") {
  return (
    <PublicLayout nav={nav} auth={auth}>
      <PatientRegister nav={nav} auth={auth} />
    </PublicLayout>
  );
}

if (page === "doctorLogin") {
  return (
    <PublicLayout nav={nav} auth={auth}>
      <DoctorLogin nav={nav} auth={auth} />
    </PublicLayout>
  );
}

if (page === "pharmacyLogin") {
  return (
    <PublicLayout nav={nav} auth={auth}>
      <PharmacyLogin nav={nav} auth={auth} />
    </PublicLayout>
  );
}

if (page === "adminLogin") {
  return (
    <PublicLayout nav={nav} auth={auth}>
      <AdminLogin nav={nav} auth={auth} />
    </PublicLayout>
  );
}


  // ---------- Patient portal (protected: role === "patient") ----------
  const patientPages = {
    patientDashboard: <PatientDashboard nav={nav} />,
    aiSpecialist: <AISpecialistFinder nav={nav} />,
    bookAppointment: <BookAppointment nav={nav} appointments={appointments} setAppointments={setAppointments} />,
    appointmentConfirmation: <AppointmentConfirmation nav={nav} appointments={appointments} />,
    myAppointments: <MyAppointments nav={nav} appointments={appointments} setAppointments={setAppointments} />,
    myPrescriptions: <MyPrescriptions nav={nav} />,
    prescriptionDetail: <PrescriptionDetail nav={nav} />,
    myReports: <MyReports nav={nav} />,
    reportViewer: <ReportViewer nav={nav} />,
    medicalHistory: <MedicalHistory />,
    patientPharmacy: <PatientPharmacy />,
    notifications: <Notifications notifications={notifications} setNotifications={setNotifications} />,
    profile: <Profile />,
  };

  if (patientPages[page]) {
  if (!session || session.role !== "patient") {
    return <PublicLayout nav={nav} auth={auth}><PatientLogin nav={nav} auth={auth} /></PublicLayout>;
  }
  return <PatientLayout nav={nav} auth={auth}>{patientPages[page]}</PatientLayout>;
}

  // ---------- Doctor portal (protected: role === "doctor") ----------
  const doctorPages = {
    doctorDashboard: <DoctorDashboard nav={nav} auth={auth} />,
    doctorPatients: <DoctorPatients nav={nav} />,
    doctorPatientRecord: <DoctorPatientRecord nav={nav} />,
    prescriptionNew: <PrescriptionNew nav={nav} />,
  };

  if (doctorPages[page]) {
    if (!session || session.role !== "doctor") {
      return <PublicLayout nav={nav} auth={auth}><DoctorLogin nav={nav} auth={auth} /></PublicLayout>;
    }
    return <DoctorLayout nav={nav} auth={auth}>{doctorPages[page]}</DoctorLayout>;
  }

  // ---------- Pharmacy portal (protected: role === "pharmacist") ----------
  if (page === "pharmacyDashboard") {
    if (!session || session.role !== "pharmacist") {
      return <PublicLayout nav={nav} auth={auth}><PharmacyLogin nav={nav} auth={auth} /></PublicLayout>;
    }
    return <PharmacyDashboard nav={nav} auth={auth} dispensed={dispensed} setDispensed={setDispensed} />;
  }

  // ---------- Admin portal (protected: role === "admin") ----------
  const adminPages = {
    adminDashboard: <AdminDashboard />,
    adminDoctors: <AdminDoctors />,
    adminPatients: <AdminPatients />,
    adminAppointments: <AdminAppointments />,
    adminPharmacy: <AdminPharmacy />,
    adminAnalytics: <AdminAnalytics />,
  };

  if (adminPages[page]) {
    if (!session || session.role !== "admin") {
      return <PublicLayout nav={nav} auth={auth}><AdminLogin nav={nav} auth={auth} /></PublicLayout>;
    }
    return <AdminLayout nav={nav} auth={auth}>{adminPages[page]}</AdminLayout>;
  }

  // ---------- 404 ----------
  return <PublicLayout nav={nav} auth={auth}><NotFound nav={nav} /></PublicLayout>;
}
