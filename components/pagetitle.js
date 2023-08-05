import Link from "next/link";

export default function PageTitle({title, blogs}) {
	return (
		<div className="flex justify-between">
	        <div className="text-3xl font-poppins-semibold">
	          {title} 
	          <span className="text-gray-500 ml-2">{blogs.length}</span>
	        </div>
	        <Link href="/admin/create">
	          <button className="focus:outline-none black-hover-btn font-avenir-light px-8 py-1.5">
	            Create new post
	          </button>
	        </Link>
      </div>
	)
}