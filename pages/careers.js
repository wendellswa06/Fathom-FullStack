import React, { useState, useEffect } from "react";
import Image from "next/image";
import Jobs from "../components/jobs";
import ContactModal from "../components/modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { openToast } from "../components/toast";
import { getJobs } from "../services/jobService";

const images = [
  { original: "/images/Joinus/Ted.jpg" },
  { original: "/images/Joinus/lab4.jpg" },
  { original: "/images/Joinus/Francisco.jpg" },
  { original: "/images/Joinus/lab1.jpg" },
  { original: "/images/Joinus/William.jpg" },
  { original: "/images/Joinus/Michael.jpg" },
  { original: "/images/Joinus/lab3.jpg" },
];

export default function CareersPage() {
  const [modalOpen, toggleModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const modal = () => {
    toggleModal(!modalOpen);
  };

  const contactSuccess = () => {
    openToast("You have contacted Fathom support team.");
    modal();
  };

  useEffect(() => {
    async function fetchJobs() {
      let response = await getJobs();
      if (response.status === 200) {
        let allJobs = { postings: [] };
        for (let i = 0; i < response.data.length; i++) {
          let category = response.data[i];
          category.id = i;
          for (let j = 0; j < category.postings.length; j++) {
            allJobs.postings.push(category.postings[j]);
          }
        }

        setJobs(response.data);
        setAllJobs(allJobs);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div id="root">
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
        style={{ width: "420px" }}
      />
      <div className="flex flex-wrap pt-28 md:pt-44">
        <div className="w-full min-h-full pr-8 pl-200 2xl:pr-24 xl:pr-12 xl:w-4/12 md:pr-14">
          <div className="flex flex-wrap h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={"relative h-1/3 image-grid image-grid" + (index + 1)}
              >
                <Image
                  src={image.original}
                  alt="Join Us Image"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full pl-8 pr-8 mt-12 2xl:w-4/12 xl:w-5/12 xl:pl-0 xl:mt-0 xl:pr-0 md:pl-14 md:pr-14 joinus-2nd">
          <div className="pb-0 text-3xl 2xl:text-5xl xl:text-4xl font-poppins-semibold">
            Join Us
          </div>
          <div className="mt-3 text-lg md:mt-10 md:text-xl font-poppins-semibold">
            We are searching for talented individuals who are driven to tackle
            the most ambitious goal of our time - building the hardware that
            enables machine intelligence.
          </div>
          <div className="mobile-text">
            <div className="mt-4 font-avenir-light md:mt-10">
              The system we’re developing at Fathom is highly interdisciplinary,
              and the scope of the development challenge within each discipline
              is also broad. For an engineer or scientist, the work at Fathom
              provides an exciting opportunity to utilize the breadth of one's
              knowledge and experience, and to gain exposure to new disciplines.
            </div>
            <div className="mt-4 font-avenir-light md:mt-8">
              One of the most important choices we make is how to use our
              talents and, the most precious thing we have, our time. We offer
              the opportunity to be a part of an ambitious start-up in its
              infancy building something that will truly make an impact in the
              world, where your skills and unique insights are critical to its
              success.
            </div>
            <div className="mt-4 font-avenir-light md:mt-8">
              We nurture an entrepreneurial environment of creativity and
              autonomy and look for passionate individuals with exceptional
              ability to execute. Our comprehensive benefits include startup
              equity, medical expenses coverage, and healthy meals.
            </div>
          </div>
          {/* <div className="mt-8 font-avenir-light">
            If you're curious please&nbsp;
            <span
              onClick={modal}
              className="font-bold underline cursor-pointer"
            >
              contact us directly
            </span>
          </div> */}
          {/* <a href="https://jobs.lever.co/fathomradiant" target="_blank">
            <button className="px-8 py-2 mt-4 focus:outline-none lg:mt-32 font-avenir-light black-hover-btn">
              Explore open roles
            </button>
          </a> */}
        </div>
      </div>
      <div className="py-12 md:py-24">
        <Jobs jobCategories={jobs} allJobs={allJobs} />
      </div>
      <ContactModal
        isOpen={modalOpen}
        toggleModal={modal}
        onSuccess={contactSuccess}
      />
    </div>
  );
}
