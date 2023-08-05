import axios from "axios";

export const sendSignupEmail = async (email) => {
  try {
    const result = await axios.post("/api/signup", { email });
    console.log("result from the server:>> ", result);
  } catch (error) {
    console.error(error);
  }
};

export const contactUsEmail = async (fullname, email, message) => {
  try {
    const result = await axios.post("/api/contactus", {
      fullname,
      email,
      message,
    });
    console.log("result from the server:>> ", result);
  } catch (error) {
    console.error(error);
  }
};
