import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function SharePostModal({ isOpen, toggleModal }) {
  const [isCopyLink, setIsCopyLink] = useState(false);

  const openCopyLink = () => {
    setIsCopyLink(!isCopyLink);
  };

  const closeModal = () => {
    setIsCopyLink(false);
    toggleModal();
  };

  const openTwitterSharePost = () => {
    var url = "https://twitter.com/intent/tweet?url=" + window.location.href;
    window.open(url, "TwitterWindow", "width=500,height=600", "_self");
    return false;
  };

  const openLinkedInSharePost = () => {
    var url =
      "https://www.linkedin.com/shareArticle?mini=true&url=" +
      window.location.href;
    window.open(url, "TwitterWindow", "width=500,height=600", "_self");
    return false;
  };

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="My dialog"
      className="my-modal"
      overlayClassName="my-overlay"
      style={customStyles}
    >
      <div onClick={closeModal} className="modal-close cursor-pointer">
        <Image
          src="/icons/close.svg"
          width={20}
          height={20}
          alt="Close Modal"
        />
      </div>
      <div className="font-avenir-light">
        {isCopyLink ? (
          <div>
            <div className="font-bold text-center">Share Link</div>
            <div className="py-8">
              <input
                className="border border-gray p-3 w-full text-gray-400 text-sm"
                type="text"
                value={window.location.href}
                readOnly
              />
              <div className="mt-8 flex justify-end text-sm">
                <button
                  onClick={openCopyLink}
                  className="focus:outline-none font-bold px-5 py-2 border"
                  style={{
                    borderColor: "rgb(70, 129, 137)",
                    color: "rgb(70, 129, 137)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={copyToClipboard}
                  className="focus:outline-none font-bold px-5 py-2 ml-4 text-white"
                  style={{ backgroundColor: "rgb(70, 129, 137)" }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-bold text-center">Share Post</div>
            <div className="py-8 flex items-center justify-center">
              <div className="mx-4 py-2 px-2 pb-0 bg-blue-400 rounded-full cursor-pointer">
                <Image
                  src="/icons/twitter-white.svg"
                  width={25}
                  height={25}
                  alt="Share Post Twitter"
                  onClick={openTwitterSharePost}
                />
              </div>
              <div className="mx-4 py-2 px-2 pb-0 bg-blue-800 rounded-full cursor-pointer">
                <Image
                  src="/icons/linkedin-white.svg"
                  width={25}
                  height={25}
                  alt="Share Post Linkedin"
                  onClick={openLinkedInSharePost}
                />
              </div>
              <div className="mx-4 py-2 px-2 pb-0 bg-black1 rounded-full cursor-pointer">
                <Image
                  src="/icons/share-icon-white.svg"
                  width={25}
                  height={25}
                  alt="Share Post Linkedin"
                  onClick={openCopyLink}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SharePostModal;
