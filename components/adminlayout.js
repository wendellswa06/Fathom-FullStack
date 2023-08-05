import { useMemo } from "react";
import AdminHeader from "../components/adminheader";
import Sidebar from "../components/sidebar";
import ErrorPage from "./404";
import Cookies from "js-cookie";

export default function AdminLayout({ children }) {
  const user = useMemo(async () => {
    const userInfo = await Cookies.getJSON("userInfo");
    return userInfo == undefined ? null : userInfo;
  }, []);

  if (!user) return <ErrorPage />;

  return (
    <div>
      <AdminHeader />
      <div>
        <Sidebar />
        <div className="h-full">
          <div className="pt-20 pb-8 m-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
