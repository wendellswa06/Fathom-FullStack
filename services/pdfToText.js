import axios from "axios";

export const pdfToText = async (info) => {
  try {
    const result = await axios.post("/api/pdfToText", info);
    return result;
  } catch (error) {
    console.error(error);
  }
};
