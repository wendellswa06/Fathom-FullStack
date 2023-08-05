import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const links = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About" },
  { href: "/careers", label: "Join Us", other: "/roles" },
  { href: "/blog", label: "Blog", other: "/posts" },
];

const activeStyle1 = {
  fontWeight: "bold",
  color: "black",
};

const activeStyle2 = {
  fontWeight: "bold",
  color: "white",
};

const blackStyle = {
  color: "black",
};

const whiteStyle = {
  color: "white",
};

export default function Nav() {
  const router = useRouter();
  const [isBlack, setIsBlack] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (
      router.pathname === "/compute-with-fathom" ||
      router.pathname === "/careers" ||
      router.pathname === "/aboutus" ||
      router.pathname === "/applyjob" ||
      router.pathname === "/blog" ||
      router.pathname.slice(0, 6) === "/posts" ||
      router.pathname.slice(0, 6) === "/roles"
    )
      setIsBlack(true);
    else setIsBlack(false);
  });

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    document.getElementById("menuButton").classList.toggle("active");
    document.getElementById("mobileMenu").classList.toggle("open");
  };

  return (
    <>
      <header
        className="absolute w-full left-0 top-0 md:py-10 py-8 nav-bar"
        style={{ position: menuActive ? "fixed" : "absolute", zIndex: "1000" }}
      >
        <nav className="flex md:justify-start justify-between items-center">
          <div className="pl-200 w-1/3">
            <Link href="/">
              <div
                style={{ zIndex: "1000" }}
                className="relative cursor-pointer header-logo"
              >
                <Image
                  src={
                    menuActive
                      ? "/images/FathomRadiantlogoWhite.svg"
                      : isBlack
                      ? "/images/FathomRadiantlogoBlack.svg"
                      : "/images/FathomRadiantlogoWhite.svg"
                  }
                  alt="Picture of logo"
                  layout="fill"
                  onClick={menuActive ? () => toggleMenu() : null}
                />
              </div>
            </Link>
          </div>
          <ul className="md:flex hidden w-2/3 pr-200">
            {links.map(({ href, label, other }) => (
              <li
                key={`${href}${label}`}
                style={
                  (other && router.pathname.slice(0, 6) === other) ||
                  router.pathname === href
                    ? isBlack
                      ? activeStyle1
                      : activeStyle2
                    : isBlack
                    ? blackStyle
                    : whiteStyle
                }
                className="header-menu-hover py-2 text-lg lg:pr-16 pr-12 font-avenir-light"
              >
                <Link href={href} className="no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="md:hidden block pr-8">
            <button
              id="menuButton"
              onClick={() => toggleMenu()}
              style={{
                position: "relative",
                zIndex: "1000",
                marginTop: "-5px",
              }}
              className={
                isBlack
                  ? "mobile-menu toggle toggle-black"
                  : "mobile-menu toggle"
              }
            >
              <span className="icon"></span>
            </button>
            <div
              id="mobileMenu"
              className="mobile-nav-menu fixed w-full h-screen left-0 top-0 bg-black1 flex pt-32"
            >
              <ul className="px-8">
                {links.map(({ href, label }) => (
                  <li
                    onClick={() => toggleMenu()}
                    key={`${href}${label}`}
                    style={{
                      fontWeight: router.pathname === href ? "bold" : "",
                    }}
                    className="py-3 text-lg text-white mobile-menu-item font-avenir-light"
                  >
                    <Link href={href} className="no-underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
