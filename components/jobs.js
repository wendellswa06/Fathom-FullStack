import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Loader from "./loader";

const Jobs = ({ jobCategories, allJobs }) => {
  const searchRef = useRef(null);
  const selectRef = useRef(null);
  const [filteredJobs, filterJobs] = useState(null);
  const [categoryId, selectCategory] = useState(0);
  const [searching, setSearching] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const setCategory = (id) => {
    selectCategory(id);
    getFilteredJobs(jobCategories[id]);
  };

  const getFilteredJobs = (jobs) => {
    filterJobs(jobs);
  };

  const selectedCategory = () => {
    setCategory(Number(selectRef.current.value));
  };

  const filter = (e) => {
    let searchKey = searchRef.current.value;
    if (searchKey) {
      setSearching(true);
      let filteredJobList = {};
      const filtered = allJobs.postings.filter(
        (value) =>
          value.text.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 ||
          value.categories.location
            .toLowerCase()
            .indexOf(searchKey.toLowerCase()) > -1
      );
      filteredJobList.postings = filtered;
      filterJobs(filteredJobList);
    } else {
      setSearching(false);
      filterJobs(jobCategories[categoryId]);
    }
  };

  const clearSearch = () => {
    searchRef.current.value = "";
    setSearching(false);
    filterJobs(jobCategories[categoryId]);
  };

  useEffect(() => {
    if (jobCategories) {
      filterJobs(jobCategories[categoryId]);
      setLoading(false);
    }
  }, [filterJobs, jobCategories]);

  return (
    <div>
      <div className="text-3xl pl-200 pr-200 2xl:text-5xl xl:text-4xl font-poppins-semibold">
        Explore Open Roles
      </div>
      <div className="mt-12 font-avenir-light md:mt-24">
        <div className="items-center justify-between pl-200 pr-200 md:flex">
          <div className="items-center md:flex">
            <input
              ref={searchRef}
              className="w-full px-2 py-3 pl-10 text-sm transition-all duration-300 bg-no-repeat border border-gray-300 rounded bg-search-input bg-left-4 md:w-60"
              placeholder="Search"
              onChange={() => filter()}
            />
            <button
              className="px-8 py-2 mt-4 ml-0 focus:outline-none mobile-text black-hover-btn md:ml-8 md:mt-0"
              style={{ display: searching ? "block" : "none" }}
              onClick={() => clearSearch()}
            >
              Back to all roles
            </button>
          </div>
          <div
            className="mt-4 mobile-text md:mt-0"
            style={{ display: searching ? "block" : "none" }}
          >
            Showing {filteredJobs && filteredJobs.postings.length} results
          </div>
        </div>
        <div className="relative h-auto md:h-96">
          <Loader isLoading={isLoading} />
          <div className="h-full mt-4 md:flex md:mt-10">
            <div
              id="categoryList"
              style={{ display: searching ? "none" : "" }}
              className="hidden w-full pb-4 pr-8 pl-200 lg:pr-0 md:pr-14 md:w-1/3 md:block"
            >
              {jobCategories &&
                jobCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="pb-2 text-xl font-bold transition duration-300 cursor-pointer hover:text-black 2xl:text-2xl"
                    onClick={(index) => setCategory(category.id)}
                    style={{
                      color: categoryId === category.id ? "black" : "lightgrey",
                    }}
                  >
                    {category.title}
                  </div>
                ))}
            </div>
            <div
              style={{ display: searching ? "none" : "" }}
              className="block w-full px-8 pb-4 lg:pr-0 md:px-14 md:hidden"
            >
              <select
                className="w-full py-2 border border-gray-300 rounded focus:outline-none mobile-text"
                ref={selectRef}
                value={categoryId}
                onChange={() => selectedCategory()}
              >
                {jobCategories &&
                  jobCategories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div
              id="jobList"
              style={{ marginTop: "-16px" }}
              className={
                searching
                  ? "w-full pl-200 pr-200"
                  : "pl-8 w-full pr-200 lg:pl-0 md:pl-14 md:w-2/3"
              }
            >
              <div className="h-full pr-0 mt-4 overflow-auto md:mt-0 md:pr-4">
                {filteredJobs &&
                  filteredJobs.postings.map((job, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: "/roles/[id]",
                        query: { title: job.text },
                      }}
                      as={`/roles/${job.id}?title=${job.text}`}
                      target="_blank"
                    >
                      <a target="_blank">
                        <div className="items-center justify-between py-3 border-b border-gray-400 cursor-pointer lg:flex">
                          <div>{job.text}</div>
                          <div className="flex">
                            <div className="text-sm">
                              {job.categories.location}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
