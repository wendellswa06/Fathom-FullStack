import Image from "next/image";
import { useAuth } from "../context/authProvider";

export default function AdminHeader() {
  const { logout } = useAuth();
  const Logout = () => {
    logout();
    document.location.href = "/admin/login";
  };

  return (
    <div className="fixed top-0 left-0 z-20 flex justify-between w-full px-8 py-3 bg-white shadow-md">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => (document.location.href = "/")}
      >
        <div className="relative" style={{ width: 30, height: 30 }}>
          <Image
            src="/images/FathomRadiantlogoBlack.svg"
            alt="Logo"
            layout="fill"
          />
        </div>
        <div className="relative ml-2" style={{ width: 120, height: 30 }}>
          <Image
            src="/images/FathomRadiant_fulllogotypestackedblack.svg"
            alt="Logo"
            layout="fill"
          />
        </div>
      </div>
      <div className="cursor-pointer font-avenir-light">
        <div onClick={Logout}>Log out</div>
      </div>
    </div>
  );
}
