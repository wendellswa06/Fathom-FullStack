import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Yup from "yup";
import Footer from "../components/footer";
import VizSensor from "react-visibility-sensor";
import Nav from "../components/nav";
import { ToastContainer } from "react-toastify";
import LazyImage from "../components/lazyImage";
import { getBlogs } from "../services/blogService";
import moment from "moment";
import Loader from "../components/loader";

export default function IndexPage() {
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef1 = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const imageRef1 = useRef(null);
  const [opacity, setOpacity] = useState(1);
  const [bottom, setBottom] = useState(null);
  const [height, setHeight] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const calcOpacity = () => {
    const scrollY = window.scrollY;
    setOpacity(1 - scrollY / 250);
  };

  useEffect(() => {
    async function fetchBlog() {
      setBlogs([]);
      setIsLoading(true);
      let response = await getBlogs();
      if (response) {
        setBlogs(response.data);
      }
      setIsLoading(false);
    }
    fetchBlog();
  }, []);

  const calcPosition = () => {
    const buttonHt = buttonRef.current.offsetHeight;
    const buttonHt1 = buttonRef1.current.offsetHeight;
    const imgTop = imageRef.current.getBoundingClientRect().top;
    const imgTop1 = imageRef1.current.getBoundingClientRect().top;
    const buttonBt =
      imgTop + imgTop1 + window.scrollY - 90 - (buttonHt + buttonHt1);
    setBottom(buttonBt + "px");
    setHeight(buttonHt);
  };

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) calcPosition();
    window.addEventListener("scroll", calcOpacity);
    window.addEventListener("resize", calcPosition);

    return () => {
      window.removeEventListener("scroll", calcOpacity);
      window.removeEventListener("resize", calcPosition);
    };
  }, []);

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "320px" }}
      />
      <div>
        <Nav />
        <div
          className="fixed left-0 z-50 scroll-down-icon pl-200"
          style={{ opacity: opacity, bottom: bottom }}
        >
          <div
            className="flex items-center justify-center border border-white rounded-full"
            style={{ width: height, height: height }}
          >
            <Image
              src="/icons/arrow-top.svg"
              alt="Scroll down"
              width="20"
              height="30"
              className="transform rotate-180"
            />
          </div>
        </div>
        <div className="relative w-full h-screen">
          <video
            loop
            muted
            autoPlay
            ref={videoRef}
            playsInline
            className="absolute hidden object-cover w-full h-full video-section sm:block portrait-desk"
          >
            <source src="/images/test.mp4" type="video/mp4" />
            Your browser does not support video tag.
          </video>
          <video
            loop
            muted
            autoPlay
            ref={videoRef}
            playsInline
            className="absolute left-0 block object-cover w-full h-full transform scale-110 -bottom-0 sm:scale-100 md:h-auto md:top-auto md:-bottom-72 sm:hidden portrait-mobile"
          >
            <source src="/images/mobile-bg.mp4" type="video/mp4" />
            Your browser does not support video tag.
          </video>
          <div className="items-center block w-full h-full text-white portrait-desk pt-28 sm:flex sm:pt-0">
            <VizSensor
              partialVisibility
              onChange={(visible) => {
                if (visible) {
                  videoRef.current.play();
                }
              }}
            >
              <div
                ref={textRef}
                className="z-10 w-full pr-8 text-center pl-200 lg:w-4/12 md:w-5/12 md:pr-0 sm:w-6/12 sm:text-left"
              >
                <div className="relative">
                  <div className="pb-4 border-b border-white">
                    <img
                      ref={imageRef}
                      onLoad={calcPosition}
                      src="/images/FathomRadiant_fulllogotypestackedwhite.svg"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-4 text-sm font-poppins-semibold 2xl:leading-10 2xl:text-xl xl:text-lg lg:text-base">
                    we are building a new type of computer{" "}
                    <br className="break-line" />
                    to enable the future of machine intelligence
                  </div>
                  <div
                    ref={buttonRef}
                    className="relative mt-10 font-avenir-light"
                  >
                    <Link href="/careers">
                      <button className="px-8 py-2 transition duration-500 border border-white focus:outline-none hover:bg-white hover:text-black 2xl:px-12 2xl:py-3">
                        Join us
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </VizSensor>
          </div>
          <div className="items-center hidden w-full h-full pt-40 pl-8 pr-8 text-center text-white portrait-mobile md:pt-60 lg:pt-80">
            <VizSensor
              partialVisibility
              onChange={(visible) => {
                if (visible) {
                  videoRef.current.play();
                }
              }}
            >
              <div
                ref={textRef}
                className="z-10 w-full m-auto text-center md:pr-0 md:w-1/2 sm:w-6/12"
              >
                <div className="relative">
                  <div className="pb-4 border-b border-white">
                    <img
                      ref={imageRef1}
                      onLoad={calcPosition}
                      src="/images/FathomRadiant_fulllogotypestackedwhite.svg"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-4 text-sm font-poppins-semibold 2xl:leading-10 2xl:text-xl xl:text-lg lg:text-base">
                    we are building a new type of computer{" "}
                    <br className="break-line" />
                    to enable the future of machine intelligence
                  </div>
                  <div
                    ref={buttonRef1}
                    className="relative mt-10 font-avenir-light"
                  >
                    <Link href="/careers">
                      <button className="px-8 py-2 transition duration-500 border border-white focus:outline-none hover:bg-white hover:text-black 2xl:px-12 2xl:py-3">
                        Join us
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </VizSensor>
          </div>
        </div>
      </div>
      <div>
        <div className="relative 3xl:h-screen">
          <div className="hidden w-full h-full 3xl:hidden md:block">
            <LazyImage
              src="/images/tech_page_brain_nets.jpg"
              alt="Technology Brain and Nests"
            />
          </div>
          <div className="absolute hidden w-full h-full 3xl:block">
            <LazyImage
              src="/images/tech_page_brain_nets.jpg"
              alt="Technology Brain and Nests"
            />
          </div>
          <div
            style={{ boxShadow: "0 20px 20px rgba(1, 2, 22, 0.7)" }}
            className="absolute w-full h-full md:hidden"
          >
            <Image
              src="/images/mobile_stars.jpg"
              alt="Technology Brain and Nests"
              layout="fill"
              className="object-cover object-bottom"
            />
          </div>
          <div className="top-0 left-0 flex justify-end w-full h-full 3xl:static md:absolute md:py-0">
            <div className="z-10 flex items-center w-full h-full pt-12 pb-2 pl-8 leading-8 text-white pr-200 lg:w-4/12 md:w-5/12 md:py-24 md:pl-0">
              <div>
                <div className="text-3xl font-poppins-semibold 2xl:text-5xl xl:text-4xl">
                  Why Fathom
                </div>
                <div className="font-avenir-light responsive-text margin-top">
                  <div>
                    The only example of human-level intelligence is the human
                    brain, which has ~125 trillion synapses. This is orders of
                    magnitude more than today’s largest artificial neural
                    networks. Fathom Radiant was founded to bridge this gap.
                  </div>
                  <div className="margin-top">
                    The limitation is the interconnect technology of traditional
                    electronic computers - put simply, the challenge is moving
                    bits around. By combining the complementary strengths of
                    optics and electronics, we created a revolutionary
                    interconnect fabric that is low latency, high bandwidth, and
                    low power.
                  </div>
                  <div className="margin-top">
                    The result is a single machine with a network capacity of a
                    supercomputer, which enables programming flexibility and
                    unprecedented scaling to models that are far larger than
                    anything yet conceived. This will allow rapid iteration and
                    accelerate the development of machine intelligence that will
                    advance our society unlike anything that has come before.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "-1px" }} className="block md:hidden">
          <img
            src="/images/mobile_brain.jpg"
            alt="Technology Brain and Nests"
            className="w-full"
          />
        </div>
      </div>
      <div>
        <div className="relative py-12 md:py-24">
          <div className="w-full pr-8 text-3xl font-bold pl-200 font-poppins-semibold 2xl:text-5xl xl:text-4xl">
            Latest from Fathom
          </div>
          {blogs.length && (
            <div className="grid grid-cols-12 mt-4 pl-200 blog md:mt-10">
              <div className="col-span-8 blog-window 2xl:col-span-5 xl:col-span-6 lg:col-span-7">
                <div
                  className="p-8 2xl:p-10"
                  style={{ backgroundColor: "rgb(186, 224, 214)" }}
                >
                  <Link href={`/posts/[title]`} as={`/posts/${blogs[0].id}`}>
                    <div>
                      <div className="relative grid grid-cols-12 cursor-pointer">
                        <div className="col-span-7 blog-image">
                          <div
                            className="w-full h-auto overflow-hidden"
                            // style={{ minHeight: "261.86px" }}
                          >
                            <img
                              src={blogs[0].cover_url}
                              className="w-full h-auto m-auto"
                            />
                          </div>
                        </div>
                        <div className="col-span-5 pl-8 blog-info sm:mt-0">
                          <div className="grid content-between h-full">
                            <div>
                              <div className="text-xl font-bold leading-snug font-avenir-light blog-title">
                                {blogs[0].title}
                              </div>
                              <div className="mt-4 font-avenir-light blog-description">
                                {blogs[0].description}
                              </div>
                            </div>
                            <div className="mt-4 text-lg">
                              <div className="flex items-center justify-between cursor-pointer">
                                <span className="mr-4 font-poppins-semibold">
                                  {moment
                                    .unix(blogs[0].created_at)
                                    .format("MMM D, YYYY")}
                                </span>
                                <Image
                                  src="/icons/arrow-right.svg"
                                  width={23}
                                  height={20}
                                  alt="Arrow Image"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-12 mt-4 pl-200 blog md:mt-10">
            <div className="relative col-span-8 blog-window 2xl:col-span-5 xl:col-span-6 lg:col-span-7">
              <Loader isLoading={isLoading} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
