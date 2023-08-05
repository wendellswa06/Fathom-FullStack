import { toast } from "react-toastify";
import Image from "next/image";

export const openToast = (content) => {
  toast.success(
    <div className="flex items-center">
      <Image
        src="/images/FathomRadiantlogoWhite.svg"
        height={20}
        width={20}
        alt="User Avatar"
        className="mr-3"
      />
      <label style={{ marginLeft: 10 }}>{content}</label>
    </div>,
    {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
