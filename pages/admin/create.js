import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { saveBlog } from "../../services/blogService";
import { ToastContainer, toast } from "react-toastify";
import { openToast } from "../../components/toast";
import "react-toastify/dist/ReactToastify.css";
import BlogEditor from "../../components/blogeditor";
import moment from "moment";
import AdminLayout from "../../components/adminlayout";

const MyComponent = (props) => {
  const router = useRouter();
  const [isSaving, setSaving] = useState(false);
  const [isPublishing, setPublishing] = useState(false);
  const [blogId, setBlogId] = useState(null);

  const saveBlogData = async (blogData) => {
    if (blogData.title) {
      setSaving(true);
      let res = await saveBlog({ ...blogData, draft: true, published: false });
      if (res.status === 201) {
        openToast(res.data.message);
        setBlogId(res.data.blogId);
      }
      setSaving(false);
    } else {
      toast.warning("Please enter Title");
    }
  };

  const publishBlogData = async (blogData) => {
    console.log("blogData create page:>> ", blogData);
    if (
      blogData.title &&
      blogData.content &&
      blogData.description &&
      blogData.coverImage
    ) {
      setPublishing(true);
      let res = await saveBlog({ ...blogData, draft: false, published: true });
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

  return (
    <AdminLayout>
      <div className="relative w-full m-auto blogEditor1 blogEditor">
        <ToastContainer
          bodyClassName="toastBody"
          position="bottom-left"
          hideProgressBar={true}
        />
        <BlogEditor
          title=""
          content=""
          blogId={blogId}
          saveBlogData={saveBlogData}
          publishBlogData={publishBlogData}
          isSaving={isSaving}
          isPublishing={isPublishing}
          created_at={moment().unix()}
          read_time={1}
        />
      </div>
    </AdminLayout>
  );
};

export default MyComponent;
