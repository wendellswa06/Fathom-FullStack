import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import BlogEditor from "../../../components/blogeditor";
import { getBlog, updateBlog } from "../../../services/blogService";
import "suneditor/dist/css/suneditor.min.css";
import { ToastContainer, toast } from "react-toastify";
import { openToast } from "../../../components/toast";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../../components/adminlayout";
import moment from "moment";

export default function Blog() {
  const router = useRouter();
  const { id, title } = router.query;
  const [blog, setBlog] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [isPublishing, setPublishing] = useState(false);
  const layoutRef = useRef(null);

  const saveBlogData = async (blogData) => {
    if (blogData.title) {
      setSaving(true);
      let res = await updateBlog({ ...blogData, id: id, published: false });
      if (res.status === 201) {
        openToast(res.data.message);
      }
      setSaving(false);
    } else {
      toast.warning("Please enter Title");
    }
  };

  const publishBlogData = async (blogData) => {
    if (
      blogData.title &&
      blogData.content &&
      blogData.description &&
      blogData.coverImage
    ) {
      setPublishing(true);
      let res = await updateBlog({ ...blogData, id: id, published: true });
      if (res.status === 201) {
        openToast(res.data.message);
        setTimeout(function () {
          router.push("/admin/published");
        }, 2000);
      }
    } else {
      toast.warning("Please input all data");
    }
  };

  useEffect(() => {
    async function fetchBlog() {
      let response = await getBlog(id);
      if (response.status === 200) {
        setBlog(response.data.data);
        setLoading(false);
      }
    }

    if (id) fetchBlog();
  }, [id]);

  useEffect(() => {
    const width = layoutRef;
    console.log("width :>> ", layoutRef);
  }, []);
  return (
    <AdminLayout ref={layoutRef}>
      <div className="relative w-full m-auto blogEditor1 blogEditor">
        <ToastContainer bodyClassName="toastBody" position="bottom-left" />
        <div>
          <Loader isLoading={isLoading} />
          {blog.content && (
            <BlogEditor
              title={title}
              content={blog.content}
              description={blog.description}
              coverImage={blog.cover_url}
              saveBlogData={saveBlogData}
              publishBlogData={publishBlogData}
              isSaving={isSaving}
              blogId={id}
              isPublishing={isPublishing}
              created_at={blog.created_at}
              read_time={blog.read_time}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
