import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  applyJob,
  getJob,
  getJobApplyForm,
} from "../../../services/jobService";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../../../components/loader";

import { ToastContainer } from "react-toastify";
import { openToast } from "../../../components/toast";
import "react-toastify/dist/ReactToastify.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SubmitSchema = Yup.object().shape({
  resume: Yup.mixed().required("A file is required"),
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  message: Yup.string(),
  coverLetter: Yup.mixed(),
  reCaptcha: Yup.string().required("Required"),
});

export default function ApplyJob() {
  const [jobData, setJobData] = useState({});
  const [formData, setFormData] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { id, title } = router.query;

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      let response = await getJob(id);
      if (response.status === 200) {
        setJobData(response.data);
      }
      response = await getJobApplyForm(id);
      console.log("formdata :>> ", response);
      if (response.status === 200) {
        setFormData(response.data.data);
      }
      setLoading(false);
    }

    if (id) fetchJob();
  }, [id]);

  const onSetCustomValue = (value, ii, jj) => {
    if (Array.isArray(formData.customQuestions[ii].fields[jj].value)) {
      formData.customQuestions[ii].fields[jj].value = [value];
    } else {
      formData.customQuestions[ii].fields[jj].value = value;
    }
  };

  const customQuestion = (question, index) => {
    if (!Boolean(question.text)) return <div key={question.id}></div>;

    return (
      <div className="mt-10" key={question.id}>
        <label className="w-full font-bold duration-200">{question.text}</label>
        {question.fields.map((field, key) => (
          <div key={key}>
            {field.type == "textarea" && (
              <div className="mt-5">
                <label htmlFor="message" className="w-full">
                  {field.text}
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={(e) =>
                      onSetCustomValue(e.target.value, index, key)
                    }
                    name="message"
                    placeholder=" "
                    className="w-full text-base border-2 h-28 focus:outline-none"
                  />
                </div>
              </div>
            )}
            {field.type == "multiple-select" && (
              <div
                className="mt-5"
                onClick={(e) => {
                  if (e.target.value)
                    onSetCustomValue(e.target.value, index, key);
                }}
              >
                <span className="duration-200">{field.text}</span>
                <div className="mt-3">
                  <label className="inline-flex items-center">
                    <input type="radio" name={key} value="yes" />
                    <span className="ml-2">Yes</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input type="radio" name={key} value="no" />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "calc(100vh - 305px)" }}>
      <ToastContainer bodyClassName="toastBody" position="bottom-left" />
      <div
        className="flex items-center w-full pb-12 pt-28 md:pt-32"
        style={{ backgroundColor: "#BAE0D6" }}
      >
        <div className="w-full px-8 m-auto xl:w-1/3 lg:w-2/3 lg:px-0 md:px-14">
          <div className="text-2xl font-poppins-semibold md:text-3xl">
            {title}
          </div>
          <div className="mt-4 text-lg font-avenir-light">
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
          <div className="mt-4 md:mt-10">
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
      <div className="w-full px-8 py-12 m-auto xl:w-1/3 lg:w-2/3 lg:px-0 md:px-14">
        <div className="text-2xl md:text-3xl font-poppins-semibold">
          Submit Your Application
        </div>
        <Loader isLoading={isLoading} />
        {!isLoading && (
          <Formik
            initialValues={{
              email: "",
              company: "",
              name: "",
              phone: "",
              resume: undefined,
              message: "",
              reCaptcha: "",
              coverLetter: "",
            }}
            validationSchema={SubmitSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("fromdata :>> ", formData);
              let response = await applyJob({ ...values, id }, formData);
              console.log("response :>> ", response);
              if (response.status == 200) {
                setSubmitted(true);
                openToast("Submitted successfully!");
                setTimeout(function () {
                  router.push("/careers");
                }, 5000);
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form
                className="mt-4 font-avenir-light md:mt-10"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block w-1/3 sm:inline">Resume</label>
                  <div
                    className="mt-4 md:ml-8 file-upload sm:mt-0"
                    style={{
                      borderColor:
                        errors.resume && touched.resume && errors.resume
                          ? "red"
                          : "black",
                    }}
                  >
                    {values.resume ? (
                      <span>{values.resume.name}</span>
                    ) : (
                      <span>Attach Resume / CV</span>
                    )}
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx,.txt"
                      required
                      onChange={(event) => {
                        setFieldValue("resume", event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div
                  className="relative mt-8 border-b-2 md:mt-10"
                  style={{
                    borderColor:
                      errors.name && touched.name && errors.name
                        ? "red"
                        : "black",
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder=" "
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="block w-full py-2 bg-transparent appearance-none focus:outline-none"
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-0 w-full duration-200 -z-1 origin-0"
                  >
                    Full Name
                  </label>
                </div>
                <div
                  className="relative mt-8 border-b-2 md:mt-10"
                  style={{
                    borderColor:
                      errors.email && touched.email && errors.email
                        ? "red"
                        : "black",
                  }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    pattern="^(?![\.\-_])((?![\-\._][\-\._])[a-z0-9\-\._]){0,63}[a-z0-9]@(?![\-])((?!--)[a-z0-9\-]){0,63}[a-z0-9]\.(|((?![\-])((?!--)[a-z0-9\-]){0,63}[a-z0-9]\.))(|([a-z]{2,14}\.))[a-z]{2,14}$"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="block w-full py-2 bg-transparent appearance-none focus:outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-0 w-full duration-200 -z-1 origin-0"
                  >
                    Email
                  </label>
                </div>
                <div
                  className="relative mt-8 border-b-2 md:mt-10"
                  style={{
                    borderColor:
                      errors.phone && touched.phone && errors.phone
                        ? "red"
                        : "black",
                  }}
                >
                  <input
                    type="text"
                    name="phone"
                    placeholder=" "
                    pattern="^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    className="block w-full py-2 bg-transparent appearance-none focus:outline-none"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute top-0 w-full duration-200 -z-1 origin-0"
                  >
                    Phone
                  </label>
                </div>
                <div
                  className="relative mt-8 border-b-2 md:mt-10"
                  style={{
                    borderColor:
                      errors.company && touched.company && errors.company
                        ? "red"
                        : "black",
                  }}
                >
                  <input
                    type="text"
                    name="company"
                    placeholder=" "
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.company}
                    className="block w-full py-2 bg-transparent appearance-none focus:outline-none"
                  />
                  <label
                    htmlFor="name"
                    className="absolute top-0 w-full duration-200 -z-1 origin-0"
                  >
                    Current Company
                  </label>
                </div>
                {formData &&
                  formData.customQuestions &&
                  formData.customQuestions.map((question, index) => {
                    return customQuestion(question, index);
                  })}
                <div className="mt-10">
                  <div className="relative mt-4">
                    <textarea
                      name="message"
                      placeholder=" "
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.message}
                      className="block w-full text-base bg-transparent appearance-none h-28 cover-letter focus:outline-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute top-0 w-full duration-200 -z-1 origin-0"
                    >
                      Please add a cover letter or just tell us why you're here
                    </label>
                  </div>
                </div>
                <div className="mt-10">
                  <ReCAPTCHA
                    style={{ display: "inline-block" }}
                    render="explicit"
                    onChange={(response) => {
                      setFieldValue("reCaptcha", response);
                    }}
                    sitekey="6Lf0EWkaAAAAAN8BCKDrfoObz_x8JauGpZ3B0VQA"
                  />
                  {errors.reCaptcha && touched.reCaptcha && (
                    <p className="text-red-500">
                      Please check the box that says "I'm not a robot."
                    </p>
                  )}
                </div>
                <button
                  className={
                    isSubmitting || submitted
                      ? "focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed mt-4 px-8 py-2 border border-black bg-white md:mt-10"
                      : "focus:outline-none hover:bg-black hover:text-white transition duration-300 mt-4 px-8 py-2 border border-black bg-white md:mt-10"
                  }
                  type="submit"
                  disabled={isSubmitting || submitted}
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
