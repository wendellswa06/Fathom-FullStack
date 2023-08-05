import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/authProvider";
import axios from "axios";
import { useRouter } from "next/router";

const SubmitSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Admin() {
  const { setCurrentUser } = useAuth();
  const router = useRouter();
  return (
    <div className="fixed flex items-center justify-center w-full h-screen">
      <div className="p-8 shadow-xl w-96">
        <div className="text-3xl text-center font-poppins-semibold">
          Sign in
        </div>
        <div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SubmitSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const response = await axios.post("/api/login", {
                  user: values,
                });
                console.log("response :>> ", response.data.user[0]);
                setCurrentUser(response.data.user[0]);
                router.push("/admin/published");
              } catch (error) {
                console.error(error);
              }
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
                      errors.password && touched.password && errors.password
                        ? "red"
                        : "black",
                  }}
                >
                  <input
                    type="password"
                    name="password"
                    placeholder=" "
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="block w-full py-2 bg-transparent appearance-none focus:outline-none"
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 w-full duration-200 -z-1 origin-0"
                  >
                    Password
                  </label>
                </div>
                <button
                  className={
                    isSubmitting
                      ? "focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed mt-4 px-8 py-2 border border-black bg-white md:mt-10"
                      : "focus:outline-none hover:bg-black hover:text-white transition duration-300 mt-4 px-8 py-2 border border-black bg-white md:mt-10"
                  }
                  type="submit"
                  disabled={isSubmitting}
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
        </div>
      </div>
    </div>
  );
}
