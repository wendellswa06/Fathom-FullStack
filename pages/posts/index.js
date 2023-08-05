import Link from "next/link";
import SignUp from "../../components/signup";

export default function PostPage() {
  return (
    <div>
      <div className="md:py-24 sm:h-auto h-screen px-8 py-16 font-avenir-light">
        <div className="pt-10 xl:w-1/2 w-full m-auto">
          <div>
            <Link href="/blog">All Posts</Link>
          </div>
          <div className="sm:py-48 py-24  flex items-center justify-center text-center">
            <div>
              <div className="xl:text-3xl text-2xl font-bold">
                We Couldn't Find This Page
              </div>
              <div className="my-4">
                Check out some of the other great posts in this blog.
              </div>
              <div className="pt-6">
                <Link href="/blog">
                  <button
                    className="focus:outline-none text-gray py-2 px-5"
                    style={{ backgroundColor: "#468189" }}
                  >
                    See More Posts
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SignUp />
    </div>
  );
}
