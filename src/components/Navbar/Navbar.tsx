"use client";
import { navbarConfig } from "@/config/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  if (!mounted) return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = navbarConfig.links.map((link, idx) => (
    <li key={`nav-${link.title.toLowerCase()}-${idx}`}>
      <Link
        href={link.href}
        className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 ${
          currentPath === link.href ? "text-blue-700 dark:text-white" : "text-gray-700 dark:text-gray-400"
        }`}
      >
        {link.title}
      </Link>
    </li>
  ));

  return (
    <nav className="bg-white border-gray-200 px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0">
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
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;