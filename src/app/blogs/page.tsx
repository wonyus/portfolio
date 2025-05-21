"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardProps, Card } from "@/components/Card/Card";
import { findBlog } from "./action";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { blogPagination } from "@/config/pagination";

const Blogs = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState<CardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(blogPagination.defaultItemsPerPage);
  const [isItemLoading, setIsItemLoading] = useState(true);

  const getUser = async () => {
    const user = await supabase.auth.getUser();
    setUser(user.data.user);
  };

  const fetchAndMapBlogs = async (currentPage: number, itemsPerPage: number, filter: string) => {
    setIsItemLoading(true);
    const response = await findBlog({ page: currentPage.toString(), limit: itemsPerPage.toString() });
    const mappedBlogs = response.data.map((blog: any) => ({
      id: blog.id,
      title: blog.title || "",
      description: blog.description || "",
      tags: blog.tags,
      image: blog.image || "",
      category: filter,
    }));
    setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
    setIsItemLoading(false);
    return filter === "All" ? mappedBlogs : mappedBlogs.filter((blog: any) => blog.category === filter);
  };

  useEffect(() => {
    const initializeBlogs = async () => {
      setIsItemLoading(true);
      getUser();
      const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, "All");
      setFilteredBlogs(blogs);
      setIsItemLoading(false);
    };
    initializeBlogs();
  }, []); // Add dependency array to prevent infinite loop

  const handleFilterClick = async (filter: string) => {
    setActiveFilter(filter);
    const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, filter);
    setFilteredBlogs(blogs);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const blogs = await fetchAndMapBlogs(newPage, itemsPerPage, activeFilter);
      setFilteredBlogs(blogs);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const blogs = await fetchAndMapBlogs(newPage, itemsPerPage, activeFilter);
      setFilteredBlogs(blogs);
    }
  };

  const handleItemPerPage = async (number: number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
    setIsItemLoading(true);
    const blogs = await fetchAndMapBlogs(1, number, activeFilter);
    setFilteredBlogs(blogs);
    setIsItemLoading(false);
  };
  const categories = [...filteredBlogs.map((blog) => blog.category)];

  const header = (
    <div>
      <h2 className="text-4xl font-bold text-center">
        My <span className="text-[#915eff]">Blogs</span>
      </h2>
      <p className="mt-4 text-primary text-[17px] max-w-3xl leading-[30px] text-center mx-auto">
        Following blogs showcase my skills and experience through real-world examples of my work. Each blog is briefly described with links to code
        repositories and live demos.
      </p>
    </div>
  );

  const category = (
    <div className="flex flex-wrap gap-4 justify-center mt-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleFilterClick(category)}
          className={`px-2 rounded-lg font-medium text-[14px] cursor-pointer ${
            activeFilter === category ? "bg-[#915eff] text-white" : "bg-tertiary text-white"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const contents = (
    <div className="mt-2 flex flex-wrap gap-2 justify-center">
      {filteredBlogs.map((blog, index) => (
        <motion.div
          key={`blog-${index}`}
          variants={{
            hidden: { opacity: 0, y: 50 },
            show: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", duration: 0.75, delay: index * 0.5 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <Card {...blog} isLoading={isItemLoading} />
        </motion.div>
      ))}
    </div>
  );

  const pagination = (
    <div className={`${blogPagination.paginationClass}`}>
      <button
        onClick={() => handlePrevPage()}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? blogPagination.disabledButtonClass : blogPagination.buttonClass}`}
      >
        Prev
      </button>
      <span className="flex items-center text-white text-[14px]">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleNextPage()}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? blogPagination.disabledButtonClass : blogPagination.buttonClass}`}
      >
        Next
      </button>

      <div className="flex items-center gap-2 ml-4 border-b-gray-600">
        <select value={itemsPerPage} onChange={(e) => handleItemPerPage(Number(e.target.value))} className={blogPagination.selectClass}>
          {blogPagination.itemsPerPageOptions.map((value) => (
            <option key={value} value={value} className="text-[14px] bg-tertiary text-gray-900 bg-gray-900/10">
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const addBlogButton = (
    <div className="flex m-5 top-10 justify-end z-10 sticky">
      <Link href="/blogs/new">
        <button className="bg-[#915eff] text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#915effe1]">Add New Blog</button>
      </Link>
    </div>
  );

  return (
    <div>
      {/* {pageIsLoading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500">{isItemLoading}</div>
        </div>
      )} */}
      <div className="relative z-0 min-h-full max-w-7xl mx-auto">
        <div className="flex flex-col">
          {user && addBlogButton}
          {header}
          {category}
          {contents}
          {pagination}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
