import axios from "axios";

export const getBlogs = async () => {
  try {
    const blogs = await axios.get("/api/blog");
    return blogs.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBlog = async (id) => {
  try {
    const blog = await axios.get(`/api/blog/${id}`);
    return blog;
  } catch (error) {
    console.error(error);
  }
};

export const saveBlog = async (blog) => {
  try {
    const result = await axios.post("/api/blog", blog);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateBlog = async (blog) => {
  try {
    const result = await axios.post(`/api/blog/${blog.id}`, blog);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getDrafts = async () => {
  try {
    const blogs = await axios.get("/api/draft");
    return blogs.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTrashed = async () => {
  try {
    const blogs = await axios.get("/api/trash");
    return blogs.data;
  } catch (error) {
    console.error(error);
  }
};

export const revertToDraft = async (ids) => {
  try {
    const result = await axios.post("/api/moveToDraft", ids);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const moveToTrash = async (ids) => {
  try {
    const result = await axios.post("/api/moveToTrash", ids);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const moveToPublish = async (id) => {
  try {
    const result = await axios.post("/api/moveToPublish", { id });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const removeBlogs = async (ids) => {
  try {
    const result = await axios.post("/api/remove", ids);
    return result;
  } catch (error) {
    console.log(error);
  }
};
