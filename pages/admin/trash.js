import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "react-data-table-component-extensions/dist/index.css";
import PageTitle from "../../components/pagetitle";
import Loader from "../../components/loader";
import {
  getTrashed,
  revertToDraft,
  removeBlogs,
} from "../../services/blogService";

import { ToastContainer, toast } from "react-toastify";
import { openToast } from "../../components/toast";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

import AdminLayout from "../../components/adminlayout";

export default function Blogs() {
  const router = useRouter();
  const searchRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedItems, setSelectItems] = useState([]);

  const selectRow = (id, value) => {
    if (selectedItems.find((item) => item === id)) {
      setSelectItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectItems([...selectedItems, id]);
    }
  };

  const selectAll = (value) => {
    let checkboxs = document.getElementsByClassName("checkbox");
    if (!value) {
      setSelectItems([]);
      for (let i = 0; i < blogs.length; i++) {
        checkboxs[i].checked = false;
      }
    } else {
      let items = [];
      for (let i = 0; i < blogs.length; i++) {
        items.push(blogs[i].id);
        checkboxs[i].checked = true;
      }
      setSelectItems(items);
    }
  };

  const filter = (filter) => {
    let table = document.getElementById("blogTable");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const remove = async () => {
    let res = await removeBlogs(selectedItems);
    if (res.status === 200) {
      openToast("Posts deleted!");
      fetchBlog();
    }
  };

  const restore = async () => {
    let res = await revertToDraft(selectedItems);
    if (res.status === 200) {
      openToast("Posts restored and moved to Draft!");
      fetchBlog();
    }
  };

  const fetchBlog = async () => {
    setSelectItems([]);
    setLoading(true);
    let response = await getTrashed();
    if (response) {
      setBlogs(response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchBlog() {
      let response = await getTrashed();
      if (response) {
        setBlogs(response.data);
        setLoading(false);
      }
    }

    fetchBlog();
  }, []);

  return (
    <AdminLayout>
      <div className="relative ml-64 mr-5 2xl:w-10/12 3xl:w-8/12">
        <ToastContainer bodyClassName="toastBody" position="bottom-left" />
        <PageTitle title="Trash" blogs={blogs} />
        <div className="mt-6 bg-white rounded shadow-2xl">
          <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200 font-avenir-light">
            <div>
              <label>
                <input
                  onChange={(event) => selectAll(event.target.checked)}
                  type="checkbox"
                  checked={
                    blogs.length && selectedItems.length === blogs.length
                      ? true
                      : false
                  }
                />
                {!selectedItems.length ? (
                  <span className="ml-8">Select All</span>
                ) : (
                  <span className="ml-8">{selectedItems.length} selected</span>
                )}
              </label>
            </div>
            <div>
              {!selectedItems.length ? (
                <input
                  ref={searchRef}
                  className="w-full px-2 py-2 pl-10 text-sm transition-all duration-300 bg-no-repeat border rounded bg-search-input bg-top-2 md:w-48"
                  placeholder="Search"
                  onChange={(event) => filter(event.target.value)}
                  disabled={isLoading || !blogs.length}
                />
              ) : (
                <div className="flex">
                  <div
                    className="flex items-center px-4 py-2 ml-2 text-sm transition duration-300 rounded-full cursor-pointer hover:bg-black hover:text-white"
                    onClick={restore}
                  >
                    Restore
                  </div>
                  <div
                    className="flex items-center px-4 py-2 ml-2 text-sm transition duration-300 rounded-full cursor-pointer hover:bg-black hover:text-white"
                    onClick={remove}
                  >
                    Delete
                  </div>
                </div>
              )}
            </div>
          </div>
          {blogs.length && !isLoading ? (
            <table className="w-full font-avenir-light">
              <tbody id="blogTable">
                {blogs.map((blog, index) => (
                  <tr
                    key={blog.id}
                    className="border-t border-gray-200 hover:bg-blue-50"
                  >
                    <td style={{ width: 10 }} className="px-8 py-4">
                      <input
                        className="checkbox"
                        type="checkbox"
                        indeterminate="true"
                        onChange={(event) =>
                          selectRow(blog.id, event.target.checked)
                        }
                      />
                    </td>
                    <td style={{ width: 80 }} className="py-6 cursor-pointer">
                      <div
                        style={{
                          backgroundColor: "#daeffe",
                          width: "90px",
                          height: "60px",
                        }}
                        className="flex items-center justify-center rounded"
                      >
                        <img src={blog.cover_url} className="w-auto h-full" />
                      </div>
                    </td>
                    <td className="px-4 cursor-pointer">
                      <div>{blog.title}</div>
                      <div className="text-xs">
                        {moment.unix(blog.created_at).format("YYYY-MM-DD") +
                          " created"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="relative flex justify-center w-full text-center font-avenir-light py-36">
              <div style={{ opacity: isLoading ? "0" : "1" }}>
                There is no data to display
              </div>
              <Loader isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
