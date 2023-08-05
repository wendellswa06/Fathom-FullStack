import React from "react";
import Image from "next/image";
import { useState } from "react";
import moment from "moment";
import Link from "next/link";

const BlogTile = ({ blog, toggleModal }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const onShareBtnClicked = () => {
    togglePopover();
    toggleModal();
  };

  return (
    <div
      className="flex flex-col flex-shrink-0 w-full mb-8 mr-10 transition-all duration-200 ease-in transform md:w-1/2 2xl:w-1/4 lg:w-1/3 font-avenir-light hover:-translate-y-2"
      key={blog.id}
      style={{
        maxHeight: "50rem",
      }}
    >
      <div className="z-10 flex h-full bg-white border border-gray-300">
        <div className="relative flex flex-col w-full cursor-pointer">
          <Link href={`/posts/[title]`} as={`/posts/${blog.id}`}>
            <div
              className="relative w-full h-auto p-6 overflow-hidden"
              style={{ minHeight: "261.86px" }}
            >
              <img src={blog.cover_url} className="w-full h-auto m-auto" />
            </div>
          </Link>
          <div className="flex items-center justify-between p-6 pt-0">
            <div className="flex items-center">
              <Image
                src="/images/FathomRadiantlogoBlack.svg"
                height={40}
                width={40}
                alt="User Avatar"
              />
              <div className="ml-2 text-sm">
                <div className="flex items-center cursor-pointer post-text overflow-ellipsis">
                  Fathom Radiant
                </div>
                <div>
                  <span>
                    {moment.unix(blog.created_at).format("MMM D, YYYY")}
                  </span>{" "}
                  <span>{blog.read_time} min</span>
                </div>
              </div>
            </div>
            <div className="relative z-50">
              <Image
                src="/icons/moreButton.jpg"
                width={5}
                height={17}
                alt="More Button"
                className="cursor-pointer"
                onClick={togglePopover}
              />
              {isPopoverOpen ? (
                <div
                  onClick={onShareBtnClicked}
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

          <div className="px-6">
            <Link href="/posts/[title]" as={`/posts/${blog.id}`}>
              <div className="pb-8 cursor-pointer post-text ">
                <div className="overflow-hidden text-lg font-bold leading-tight post-title overflow-ellipsis md:text-xl max-h-14">
                  {blog.title}
                </div>
                <div className="mt-2 leading-tight post-description overflow-ellipsis mobile-text">
                  {blog.description}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTile;
