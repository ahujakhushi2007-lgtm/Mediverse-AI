import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ nav, auth, children }) {
  return (
    <>
      <Navbar nav={nav} auth={auth} />
      <main>
        {children}
      </main>
      <Footer nav={nav} />
    </>
  );
}
