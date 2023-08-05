import React, { useState, useEffect } from "react";
import Image from "next/image";
import ShareLinkModal from "./sharelinkmodal";

export default function SharePost() {
  const [url, setUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  });

  const openTwitterSharePost = () => {
    var url = "https://twitter.com/intent/tweet?url=" + window.location.href;
    window.open(url, "TwitterWindow", "width=500,height=600", "_blank");
    return false;
  };

  const openLinkedInSharePost = () => {
    var url =
      "https://www.linkedin.com/shareArticle?mini=true&url=" +
      window.location.href;
    window.open(url, "TwitterWindow", "width=500,height=600", "_blank");
    return false;
  };

  const openCopyLink = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="mt-20 py-4 border-gray-300 border-b border-t flex items-center">
      <div>
        <Image
          src="/icons/twitter.svg"
          width={20}
          height={20}
          alt="Twitter Share"
          className="cursor-pointer"
          onClick={openTwitterSharePost}
        />
      </div>
      <div className="ml-6">
        <Image
          src="/icons/linkedin.svg"
          width={20}
          height={20}
          alt="Linkedin Share"
          className="cursor-pointer"
          onClick={openLinkedInSharePost}
        />
      </div>
      <div className="ml-6">
        <Image
          src="/icons/share.svg"
          width={20}
          height={20}
          alt="Link Share"
          className="cursor-pointer"
          onClick={openCopyLink}
        />
      </div>
      <ShareLinkModal isOpen={modalOpen} toggleModal={openCopyLink} url={url} />
    </div>
  );
}
