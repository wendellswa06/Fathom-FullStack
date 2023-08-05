import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getJob } from "../../services/jobService";
import Loader from "../../components/loader";

export default function Job() {
  const [jobData, setJobData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id, title } = router.query;

  useEffect(() => {
    async function fetchJob() {
      let response = await getJob(id);
      if (response.status === 200) {
        setJobData(response.data);
        setLoading(false);
      }
    }

    if (id) fetchJob();
  }, [id]);

  return (
    <div style={{ minHeight: "calc(100vh - 305px)" }}>
      <div
        className="flex items-center w-full px-8 pb-12 pt-28 lg:px-0 md:px-14 md:pt-44 md:pb-24"
        style={{ backgroundColor: "#BAE0D6" }}
      >
        <div className="w-full m-auto xl:w-1/3 lg:w-2/3 lg:px-0">
          <div className="text-2xl font-poppins-semibold md:text-3xl">
            {title}
          </div>
          <div className="mt-4 text-lg mobile-text font-avenir-light">
            {jobData.categories && (
              <div>
                {jobData.categories.location}
                {" / "}
                {jobData.categories.commitment}
                {" / "}
                {jobData.categories.team}
              </div>
            )}
          </div>
          <div className="block mt-4 sm:flex md:mt-10">
            <div>
              <Link
                href={{
                  pathname: "/roles/[id]/apply",
                  query: { title: title },
                }}
                as={`/roles/${router.query.id}/apply?title=${title}`}
              >
                <a>
                  <button className="px-8 py-2 focus:outline-none black-hover-btn job-btn font-avenir-light">
                    Apply Now
                  </button>
                </a>
              </Link>
            </div>
            <div className="mt-4 sm:ml-4 sm:mt-0">
              <Link href="/careers">
                <a>
                  <button className="px-8 py-2 focus:outline-none black-hover-btn job-btn font-avenir-light">
                    Back to all roles
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full px-8 py-12 m-auto font-avenir-light mobile-text xl:w-1/3 lg:w-2/3 lg:px-0 md:py-24 md:px-14">
        <Loader isLoading={isLoading} />
        <div dangerouslySetInnerHTML={{ __html: jobData.description }} />
        <div>
          {jobData.lists &&
            jobData.lists.map((list, index) => (
              <div className="mt-4 md:mt-10" key={index}>
                <div className="text-2xl font-bold">{list.text}</div>
                <ul
                  className="pl-5 mt-4 list-disc"
                  dangerouslySetInnerHTML={{ __html: list.content }}
                />
              </div>
            ))}
        </div>
        <Link
          href={{ pathname: "/roles/[id]/apply", query: { title: title } }}
          as={`/roles/${router.query.id}/apply?title=${title}`}
        >
          <a>
            <button
              style={{ display: isLoading ? "none" : "" }}
              className="px-8 py-2 mt-4 focus:outline-none black-hover-btn font-avenir-light md:mt-10"
            >
              Apply for this position
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}
