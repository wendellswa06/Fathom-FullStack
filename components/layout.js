import { useRouter } from "next/router";
import Nav from "./nav";
import Footer from "./footer";

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div id="page-transition">
      {router.pathname !== "/" ? <Nav /> : null}
      <div className="main-container" id="root">
        {children}
        {router.pathname !== "/" ? <Footer /> : null}
      </div>
    </div>
  );
}
