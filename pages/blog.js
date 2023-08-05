import { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import SharePostModal from "../components/sharepostmodal";
import BlogTile from "../components/blogTile";

export default function Blog() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      setBlogs([]);
      let response = await getBlogs();
      if (response) {
        console.log("blogs from the db :>> ", response.data);
        setBlogs(response.data);
      }
      setLoading(false);
    }

    fetchBlog();
  }, []);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <div
        className="relative w-full h-auto pb-12 bg-white pl-200 pr-200 md:pt-44 md:pb-24 pt-28 "
        style={{
          minHeight: "calc(100vh - 305px)",
        }}
      >
        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="loader">Loading...</div>
          </div>
        )}
        <div className="absolute block text-xl font-bold top-32">
          <a href="/blog">All Posts</a>
        </div>
        <div className="flex flex-wrap md:flex-nowrap">
          {blogs.map((blog, key) => (
            <BlogTile key={key} blog={blog} toggleModal={toggleModal} />
          ))}
        </div>
        <SharePostModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
    </div>
  );
}
