import Modal from "react-modal";
import Image from "next/image";
import { Formik } from "formik";
import * as Yup from "yup";
import { contactUsEmail } from "../services/emailSender";

const SubmitSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().required("Required"),
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ContactModal = ({ isOpen, toggleModal, onSuccess }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="My dialog"
      className="my-modal"
      overlayClassName="my-overlay"
      style={customStyles}
    >
      <div onClick={toggleModal} className="modal-close cursor-pointer">
        <Image
          src="/icons/close.svg"
          width={20}
          height={20}
          alt="Close Modal"
        />
      </div>
      <div className="text-2xl font-poppins-semibold">Contact Us</div>
      <Formik
        initialValues={{ email: "", name: "", message: "" }}
        validationSchema={SubmitSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await contactUsEmail(values.name, values.email, values.message);
          onSuccess();
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
                  errors.name && touched.name && errors.name ? "red" : "black",
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
            <div
              className="mt-10 relative border-b-2"
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
                Enter your email here
              </label>
            </div>
            <div
              className="mt-10 relative border-b-2"
              style={{
                borderColor:
                  errors.message && touched.message && errors.message
                    ? "red"
                    : "black",
              }}
            >
              <textarea
                name="message"
                placeholder=" "
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className="font-bold py-2 pb-10 block w-full appearance-none focus:outline-none bg-transparent"
              />
              <label
                htmlFor="message"
                className="font-bold absolute top-0 -z-1 duration-300 origin-0"
              >
                Your message here
              </label>
            </div>
            <button
              className="w-full bg-black text-white py-2 px-8 mt-6 font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default ContactModal;
