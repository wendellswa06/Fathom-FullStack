import { animateScroll as scroll } from "react-scroll";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/careers", label: "Join Us" },
  { href: "/blog", label: "Blog" },
];

export default function Footer() {
  const router = useRouter();

  const scrollTop = (path) => {
    if (path === "/") scroll.scrollToTop();
    else router.push("/");
  };

  return (
    <div>
      <div className="bg-black1 pt-6 pb-10 text-white font-bold">
        <div className="grid grid-cols-12">
          <div className="md:col-span-4 pl-200 col-span-full text-2xl pt-12">
            <div
              className="cursor-pointer"
              onClick={() => scrollTop(router.pathname)}
            >
              <Image
                src="/icons/arrow-top.svg"
                alt="Arrow Top Image"
                width={20}
                height={23}
              />
              <div className="mt-4 font-avenir-light">Fathom Radiant</div>
            </div>
          </div>
          <div className="md:col-span-8 md:pt-0 pt-8 col-span-full footer-menu">
            <div className="relative">
              <ul className="md:flex block justify-start">
                {links.map(({ href, label }) => (
                  <li
                    key={`${href}${label}`}
                    style={{
                      fontWeight: router.pathname === href ? "bold" : "normal",
                    }}
                    className="pr-6 footer-link py-1.5 text-lg text-white font-avenir-light"
                  >
                    <Link href={href} className="no-underline">
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="mobile-footer-menu pr-6  p-1.5 text-lg font-bold">
                  More
                  <ul className="mobile-footer-menu-content absolute bg-white bottom-full">
                    {links.map(({ href, label }) => (
                      <li
                        key={`${href}${label}`}
                        style={{
                          fontWeight: router.pathname === href ? "bold" : "",
                        }}
                        className="footer-link py-2 px-4 text-lg text-white"
                      >
                        <Link href={href} className="no-underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="pt-16">
              <div className="flex justify-start">
                <a
                  href="https://www.linkedin.com/company/fathom-radiant"
                  target="_blank"
                  style={{ width: 20, height: 20 }}
                  className="relative"
                >
                  <Image
                    src="/icons/linkedin-white.svg"
                    alt="Linkedin Icon"
                    layout="fill"
                  />
                </a>
                <a
                  href="https://twitter.com/FathomRadiant"
                  target="_blank"
                  className="relative ml-4"
                  style={{ width: 20, height: 20 }}
                >
                  <Image
                    src="/icons/twitter-white.svg"
                    alt="Twitter Icon"
                    layout="fill"
                  />
                </a>
              </div>
              <div className="grid grid-cols-12 pt-4 font-normal">
                <div className="md:col-span-6 col-span-full pr-10 font-avenir-light">
                  <div>
                    <a
                      data-auto-recognition="true"
                      href="mailto:hello@fathomradiant.co"
                    >
                      <small>hello@fathomradiant.co</small>
                    </a>
                  </div>
                  <div className="mt-5">
                    <small>1512 Decoto Rd</small>
                  </div>
                  <div>
                    <small>Union City, CA 94587</small>
                  </div>
                </div>
                <div className="md:col-span-6 md:pt-0 font-avenir-light pt-6 col-span-full flex items-end">
                  <small>
                    © {new Date().getFullYear()} Fathom Radiant, PBC
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
