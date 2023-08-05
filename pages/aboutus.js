import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import SignUp from "../components/signup";

const SubmitSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const titles = [
  { name: "Khosla Ventures" },
  { name: "Jeff Bezos" },
  { name: "Founders Fund" },
  { name: "Playground Globlal" },
];

const investors = [
  {
    name: "Scott Gray",
    role: "OpenAI",
    link:
      "https://scholar.google.com/citations?hl=en&user=sRId4vsAAAAJ&view_op=list_works&sortby=pubdate",
  },
  {
    name: "Boris Murmann",
    role: "Stanford",
    link: "https://en.wikipedia.org/wiki/Boris_Murmann",
  },
  {
    name: "Kelvin Wagner",
    role: "CU Boulder",
    link: "https://www.colorado.edu/ecee/kelvin-wagner",
  },
  { name: "Jaan Tallinn", role: "", link: "" },
  {
    name: "Joseph Goodman",
    role: "Stanford",
    link: "https://en.wikipedia.org/wiki/Joseph_W._Goodman",
  },
  {
    name: "Tom Brown",
    role: "OpenAI",
    link:
      "https://scholar.google.com/citations?hl=en&user=RLvsC94AAAAJ&view_op=list_works&sortby=pubdate",
  },
  {
    name: "David Miller",
    role: "Stanford",
    link:
      "https://scholar.google.com/citations?hl=en&user=mF_qs5sAAAAJ&view_op=list_works&sortby=pubdate",
  },
  {
    name: "Alex Fang",
    role: "",
    link: "https://www.entradaventures.com/people-fang",
  },
];

export default function AboutPage() {
  const [isShow, setCollapse] = useState(false);

  const toggleCollapse = () => {
    setCollapse(!isShow);
  };

  return (
    <div>
      <div className="pb-12 md:pt-44 md:pb-24 pt-28">
        <div className="grid grid-cols-12 gap-0">
          <div className="text-3xl xl:text-4xl lg:col-span-4 pl-200 col-span-full 2xl:text-5xl font-poppins-semibold">
            Who we are
          </div>
          <div className="pl-8 mt-4 leading-8 lg:col-span-8 lg:pl-0 md:pl-14 lg:mt-0 md:mt-10 col-span-full pr-200 font-avenir-light ">
            <div className="mobile-text lg:w-1/2 aboutus-1st">
              <div>
                Fathom was founded using first-principles thinking to build
                hardware that can enable machine intelligence. Fathom's 3D
                optical architecture is a step-change technology that can
                accelerate the development of machine intelligence by decades.
              </div>
              <div className="col-span-5 mt-4 2xl:pr-8 md:mt-8">
                We don't consider progress inevitable and believe that we can
                make the difference in whether human-level machine intelligence
                can happen in our lifetimes.
              </div>
              <div className="col-span-5 mt-4 2xl:pr-8 md:mt-8">
                At Fathom we chose to consider the risks that such
                transformative technology can create and align ourselves with
                individuals and organizations to mitigate such risks. As a
                public benefit corporation we want to build technology that will
                benefit not just the shareholders but society as a whole.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-12 pl-200 pr-200 md:py-24"
        style={{ backgroundColor: "rgb(186, 224, 214)" }}
      >
        <div>
          <div className="text-3xl 2xl:text-5xl xl:text-4xl font-poppins-semibold">
            Select Investors & Advisors
          </div>
          <div className="mt-4 font-avenir-light md:mt-10">
            <div className="grid grid-cols-12 mb-3 md:mb-0 ">
              {titles.map((title, index1) => (
                <div
                  key={index1}
                  className="text-lg font-bold lg:col-span-3 md:text-xl sm:col-span-6 col-span-full aboutus-2nd"
                >
                  {title.name}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12">
              {investors.map((item, index2) => (
                <div
                  key={index2}
                  className="mt-1 lg:col-span-3 sm:col-span-6 col-span-full md:mt-8 mobile-text aboutus-2nd"
                >
                  <div>
                    {item.link === "" ? (
                      <div>
                        <span>{item.name}</span>
                        <span className="ml-1 text-gray-500">{item.role}</span>
                      </div>
                    ) : (
                      <a href={item.link} target="_blank">
                        <span>{item.name}</span>
                        <span className="ml-1 text-gray-500">{item.role}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-12 gap-0 py-12 md:py-24">
        <div className="mb-4 md:mb-8 md:col-span-4 lg:mb-0 col-span-full pl-200">
          <div className="text-3xl 2xl:text-5xl xl:text-4xl font-poppins-semibold">
            Contact us
          </div>
        </div>
        <div className="pl-8 2xl:col-span-4 xl:col-span-6 md:col-span-8 md:pl-0 col-span-full">
          <div className="font-avenir-light">
            <div className="w-full">
              <div className="grid grid-cols-12">
                <div className="pr-8 mb-4 md:mb-8 md:col-span-6 md:pr-0 col-span-full">
                  <a href="/careers">
                    <button className="w-2/3 py-2 black-hover-btn">
                      Explore open roles
                    </button>
                  </a>
                </div>
                <div className="md:col-span-6 col-span-full">
                  <a
                    data-auto-recognition="true"
                    href="mailto:hello@fathomradiant.co"
                  >
                    hello@fathomradiant.co
                  </a>
                  <div className="mt-2 md:mt-16">
                    Fathom Radiant
                    <br />
                    1512 Decoto Rd
                    <br />
                    Union City, CA 94587
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
