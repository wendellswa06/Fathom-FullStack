import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/admin/published", label: "Published" },
  { href: "/admin/drafts", label: "Drafts" },
  { href: "/admin/trash", label: "Trash" },
  { href: "/admin/create", label: "Create New Post" },
];

export default function Sibebar() {
  const router = useRouter();

  return (
    <div
      style={{ width: 240 }}
      className="fixed z-10 hidden h-screen pt-20 bg-black1 lg:block"
    >
      <div className="px-8 pb-6">
        <img
          src="/images/FathomRadiant_fulllogotypestackedwhite.svg"
          className="w-full"
        />
      </div>
      <hr />
      <div className="p-8">
        <ul className="hidden md:block">
          {links.map(({ href, label }) => (
            <li
              key={`${href}${label}`}
              style={{
                fontWeight: router.pathname === href ? "bold" : "",
              }}
              className="py-2 text-base text-white header-menu-hover font-avenir-light"
            >
              <Link href={href} className="no-underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
