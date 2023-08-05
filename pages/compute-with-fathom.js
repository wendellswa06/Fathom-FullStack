import { Formik } from "formik";
import * as Yup from "yup";

const SubmitSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  challenge: Yup.string().required("Required"),
  other: Yup.string().required("Required"),
});

export default function ComputeWithFathomPage() {
  return (
    <div className="p-200 py-200">
      <div className="grid grid-cols-12 lg:gap-10 gap-0">
        <div className="lg:col-span-6 lg:pt-0 pt-16 col-span-full">
          <div className="lg:pr-20 md:text-4xl text-3xl font-poppins-semibold mb-12">
            Compute with Fathom
          </div>
        </div>
        <div className="lg:col-span-6 col-span-full">
          <div className="md:text-3xl text-2xl font-avenir-light font-bold">
            Customer Inquiry Form
          </div>
          <Formik
            initialValues={{
              email: "",
              company: "",
              name: "",
              challenge: "",
              other: "",
            }}
            validationSchema={SubmitSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
                  className="mt-10 relative border-b-2"
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
                    className="font-bold py-2 block w-full appearance-none focus:outline-none bg-transparent"
                  />
                  <label
                    htmlFor="name"
                    className="font-bold absolute top-0 -z-1 duration-300 origin-0"
                  >
                    Name
                  </label>
                </div>
                <div className="mt-10 grid grid-cols-12 gap-4">
                  <div
                    className="mt-4 sm:col-span-6 col-span-full relative border-b-2"
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
                      className="font-bold py-2 block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="email"
                      className="font-bold absolute top-0 -z-1 duration-300 origin-0"
                    >
                      Email
                    </label>
                  </div>
                  <div
                    className="md:mt-4 mt-8 sm:col-span-6 col-span-full relative border-b-2"
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
                      className="font-bold py-2 block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="company"
                      className="font-bold absolute top-0 -z-1 duration-300 origin-0"
                    >
                      Company
                    </label>
                  </div>
                </div>
                <div className="mt-10 font-avenir-w35-light">
                  <div className="font-bold">
                    Which applications are you interested in?
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">
                        AI research and hyperscaling
                      </span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">Software</span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">
                        Automation & Robotics
                      </span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">Healthcare</span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">
                        Media & Audio Visual
                      </span>
                    </label>
                  </div>
                  <div className="mt-3">
                    <label>
                      <input type="radio" required name="application" />
                      <span className="ml-4 radio-label">Other</span>
                    </label>
                  </div>
                </div>
                <div className="mt-10">
                  <div
                    className="mt-10 relative border-b-2"
                    style={{
                      borderColor:
                        errors.challenge &&
                        touched.challenge &&
                        errors.challenge
                          ? "red"
                          : "black",
                    }}
                  >
                    <textarea
                      name="challenge"
                      placeholder=" "
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.challenge}
                      className="font-bold py-2 pb-10 block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="challenge"
                      className="font-bold absolute top-0 -z-1 duration-300 origin-0"
                    >
                      Please tell us about your challenge.
                    </label>
                  </div>
                </div>
                <div className="mt-10">
                  <div
                    className="mt-10 relative border-b-2"
                    style={{
                      borderColor:
                        errors.other && touched.other && errors.other
                          ? "red"
                          : "black",
                    }}
                  >
                    <textarea
                      name="other"
                      placeholder=" "
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.other}
                      className="font-bold py-2 pb-10 block w-full appearance-none focus:outline-none bg-transparent"
                    />
                    <label
                      htmlFor="other"
                      className="font-bold absolute top-0 -z-1 duration-300 origin-0"
                    >
                      Anything else you would like to add?
                    </label>
                  </div>
                </div>
                <button
                  className="border-2 border-black py-2 px-8 mt-6 font-bold"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
