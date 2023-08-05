import axios from "axios";

export const getJobs = async () => {
  try {
    const result = await axios.get(
      "https://api.lever.co/v0/postings/fathomradiant?group=team&mode=json"
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getJob = async (id) => {
  try {
    const result = await axios.get(
      `https://api.lever.co/v0/postings/fathomradiant/${id}?group=team&mode=json`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getJobApplyForm = async (job_id) => {
  try {
    const result = await axios.get(`/api/job?job_id=${job_id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const applyJob = async (values, formData) => {
  try {
    formData.personalInformation[0].value = values.name;
    formData.personalInformation[1].value = values.email;
    formData.personalInformation[2].value = values.company;
    formData.personalInformation[3].value = values.phone;
    formData.personalInformation[4].value = null; //resume
    formData.personalInformation[5].value = values.message;

    let form = new FormData();
    form.append("resume", values.resume);
    form.append("formData", JSON.stringify(formData));
    form.append("id", values.id);
    const result = await axios.post("/api/job", form);

    return result;
  } catch (error) {
    console.error(error);
  }
};
