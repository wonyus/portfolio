"use client";
import { navbarConfig } from "@/config/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const checkActiveLink = (href: string) => {
    return pathname.split("/")[1] === href.replace("/", "");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = navbarConfig.links.map((link, idx) => (
    <li key={`nav-${link.title.toLowerCase()}-${idx}`}>
      <Link
        href={link.href}
        className={`block py-2 pl-2 pr-2 rounded bg-none  hover:text-purple-800 hover:bg-transparen ${
          checkActiveLink(link.href) ? "text-purple-950 dark:text-white" : "text-gray-700 dark:text-gray-300"
        }`}
        onClick={() => setIsOpen(false)} // Close menu on link click
        aria-current={checkActiveLink(link.href) ? "page" : undefined}
      >
        {link.title}
      </Link>
    </li>
  ));

  return (
    <nav className="relative border-gray-200 px-4 py-2.5 w-full mx-auto top-0 content-center">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">IMRON YUSOH</span>
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto `}>
          <ul className="flex flex-col p-4 mt-4 border bg-none border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
