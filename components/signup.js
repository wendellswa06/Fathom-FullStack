import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { sendSignupEmail } from "../services/emailSender";
import "react-toastify/dist/ReactToastify.css";
import { openToast } from "../components/toast";

const SubmitSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function SignUp() {
  return (
    <div
      className="md:py-20 py-12 grid grid-cols-12"
      style={{ backgroundColor: "#77ACA2" }}
    >
      <div className="md:col-span-4 col-span-full pl-200">
        <div className="text-white text-4xl font-poppins-semibold mb-10">
          Stay updated
        </div>
      </div>
      <div className="md:col-span-8 md:pl-0 pl-8 col-span-full pr-200">
        <div className="2xl:w-5/12 xl:w-6/12 lg:w-8/12 border signup-form border-white py-8 px-10">
          <div className="text-lg font-avenir-light text-white">
            Sign Up To Our Blog
          </div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={SubmitSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await sendSignupEmail(values.email);
              openToast("You have sent an email.");
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
            }) => (
              <form className="font-avenir-light" onSubmit={handleSubmit}>
                <div
                  className="mt-4 relative border-b-2 border-white"
                  style={{
                    borderColor:
                      errors.email && touched.email && errors.email
                        ? "red"
                        : "white",
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
                    className="font-bold py-2 block w-full appearance-none focus:outline-none bg-transparent"
                  />
                  <label
                    htmlFor="email"
                    className="italic absolute top-0 duration-300 origin-0"
                  >
                    email
                  </label>
                </div>
                <button
                  className="focus:outline-none hover:text-black w-full p-4 text-white font-poppins-semibold italic text-right"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="mt-10 flex items-center">
          <a
            href="https://www.linkedin.com/company/fathom-radiant"
            target="_blank"
          >
            <Image
              src="/icons/linkedin-white.svg"
              alt="Linkedin Icon"
              width={20}
              height={20}
            />
          </a>
          <a
            href="https://twitter.com/FathomRadiant"
            target="_blank"
            className="ml-4"
          >
            <Image
              src="/icons/twitter-white.svg"
              alt="Twitter Icon"
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
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
    </div>
  );
}
