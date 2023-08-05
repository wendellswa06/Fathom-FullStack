import React, { useEffect } from "react";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/login");
  }, []);

  return <div></div>;
};

export default ErrorPage;
