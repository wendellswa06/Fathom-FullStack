import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import useClickOutside from "./../../hooks/useClickOutSide";
import FullScreenViewer from "../../components/fullscreenviewer";
import SharePostModal from "../../components/sharepostmodal";
import SharePost from "../../components/sharepost";
import { getBlog } from "../../services/blogService";
import moment from "moment";

const images = [
  {
    original: "/images/a27d24_6bb004c959b24c7a87fc9e6acd5040ff_mv2.webp",
  },
  {
    original: "/images/2d0cc3_aba78c559b7e4672a5926af4c65c487e_mv2.webp",
  },
  {
    original: "/images/2d0cc3_10757b6e8bbf45c3bc5dd353a9284511_mv2.webp",
  },
  {
    original: "/images/blogpost.gif",
  },
];

export default function Challenge() {
  const router = useRouter();
  const { id, title } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const popRef = useRef(null);

  useClickOutside(popRef, () => {
    setPopoverOpen(false);
  });

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      let response = await getBlog(id);
      if (response.status === 200) {
        console.log("blog :>> ", response.data.data);
        setBlog(response.data.data);
      }
      setLoading(false);
    }
    if (id) fetchBlog();
  }, [id]);

  const toggleFullScreenViewer = () => {
    setVisible(!visible);
  };

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const toggleModal = () => {
    setPopoverOpen(false);
    setModalOpen(!isModalOpen);
  };

  return (
    <div
      className="px-8 pb-12 pt-28 md:pt-44 md:pb-24 lg:px-0 md:px-14"
      style={{ minHeight: "calc(100vh - 305px)" }}
    >
      <FullScreenViewer
        images={images}
        startIndex={startIndex}
        visible={visible}
        toggleFullScreenViewer={toggleFullScreenViewer}
      />
      <div className="font-avenir-light">
        <div className="w-full m-auto 2xl:w-1/3 lg:w-1/2">
          {loading && (
            <div className="flex items-center justify-center w-full h-full">
              <div className="loader">Loading...</div>
            </div>
          )}
          {blog && (
            <div className="flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center">
                  <Image
                    src="/images/FathomRadiantlogoBlack.svg"
                    width={30}
                    height={30}
                    alt="User Image"
                  />
                  <Link href="/profile">
                    <div className="flex items-center ml-2 cursor-pointer hover:text-green-500 overflow-ellipsis">
                      Fathom Radiant
                    </div>
                  </Link>
                  <div>
                    <span>
                      &nbsp;&nbsp;
                      {moment.unix(blog.created_at).format("MMM D, YYYY")}
                      &nbsp;&nbsp;{blog.read_time} min read
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex items-center" ref={popRef}>
                  <Image
                    src="/icons/moreButton.svg"
                    width={19}
                    height={19}
                    alt="More Button"
                    className="cursor-pointer"
                    onClick={togglePopover}
                  />
                  {isPopoverOpen ? (
                    <div
                      onClick={toggleModal}
                      className="absolute flex items-center w-40 p-3 text-sm bg-white shadow-lg cursor-pointer right-6 top-full"
                    >
                      <Image
                        src="/icons/share-icon.svg"
                        width={19}
                        height={19}
                        alt="Share Post Icon"
                      />
                      <span className="ml-4">Share Post</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 font-avenir-light">
                {/* <div className="text-2xl font-bold leading-tight 2xl:text-4xl md:text-3xl">
                  {blog.title}
                </div> */}
                <div style={{ minHeight: "30vh" }} className="relative mt-4">
                  <div
                    className="sun-editor-editable font-avenir-light mobile-text"
                    style={{ padding: 0 }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                </div>
              </div>
              <SharePost />
            </div>
          )}
        </div>
      </div>
      <SharePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
}
