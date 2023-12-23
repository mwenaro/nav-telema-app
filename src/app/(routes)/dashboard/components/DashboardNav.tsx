import Link from "next/link";
import { navItems } from "./data";
import ProfilePic from "./ProfilePic";

const myLi = (navLink: any) => (
  <li>
    <Link
      href={navLink.href}
      className="text-left hover:font-bold rounded-md flex gap-2 justify-center  md:justify-between"
    >
      <span>{navLink.icon} </span>
      <span className="hidden sm:flex text-left">{navLink.title}</span>
    </Link>
  </li>
);
export default function DashboardNav() {
  return (
    <aside className=" w-[50px] md:w-64  lg:w-fit min-h-screen h-fit bg-[#121E31] border p-3 text-white dark:bg-red-400">
      {/* <h3 className="px-2 py-3 md:py-10 text-base md:text-2xl">

      </h3> */}
      <ProfilePic />

      <nav className="w-full flex flex-col bg-[#121E31]  font-light ">
        <ul className="w-full flex flex-col gap-5 p-2">
          {navItems.map((link) => myLi(link))}
        </ul>
      </nav>
    </aside>
  );
}
