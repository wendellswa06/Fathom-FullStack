import React, { useState } from "react";
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

function ShareLinkModal({ isOpen, toggleModal, url }) {
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
      onRequestClose={toggleModal}
      contentLabel="My dialog"
      className="my-modal"
      overlayClassName="my-overlay"
      style={customStyles}
    >
      <div onClick={toggleModal} className="modal-close cursor-pointer">
        <Image
          src="/icons/close.svg"
          width={20}
          height={20}
          alt="Close Modal"
        />
      </div>
      <div className="font-avenir-light">
        <div>
          <div className="font-bold text-center">Share Link</div>
          <div className="py-8">
            <input
              className="border border-gray p-3 w-full text-gray-400 text-sm"
              type="text"
              value={url}
              readOnly
            />
            <div className="mt-8 flex justify-end text-sm">
              <button
                onClick={toggleModal}
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
      </div>
    </Modal>
  );
}

export default ShareLinkModal;
