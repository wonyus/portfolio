"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardProps, Card } from "@/components/Card/Card";
import { findBlog } from "./action";

const Blogs = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState<CardProps[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const fetchAndMapBlogs = async (currentPage: number, itemsPerPage: number, filter: string) => {
    const response = await findBlog({ page: currentPage.toString(), limit: itemsPerPage.toString() });
    const mappedBlogs = response.data.map((blog) => ({
      id: blog.id,
      name: blog.title || "",
      description: blog.content || "",
      tags: blog.tags,
      image: blog.image || "",
      category: filter,
    }));
    setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
    return filter === "All" ? mappedBlogs : mappedBlogs.filter((blog) => blog.category === filter);
  };

  useEffect(() => {
    const initializeBlogs = async () => {
      const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, "All");
      setFilteredBlogs(blogs);
      setMounted(true);
    };
    initializeBlogs();
  });

  const handleFilterClick = async (filter: string) => {
    setActiveFilter(filter);
    const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, filter);
    setFilteredBlogs(blogs);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, activeFilter);
      setFilteredBlogs(blogs);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, activeFilter);
      setFilteredBlogs(blogs);
    }
  };

  const handleItemPerPage = async (number: number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
    const blogs = await fetchAndMapBlogs(1, number, activeFilter);
    setFilteredBlogs(blogs);
  };

  const categories = ["All", ...new Set(filteredBlogs.map((blog) => blog.category))];

  if (!mounted) return null;

  return (
    <div className="relative z-0 min-h-screen max-w-7xl mx-auto">
      <div className="mt-20 flex flex-col">
        <h2 className="text-4xl font-bold text-center">
          My <span className="text-[#915eff]">Blogs</span>
        </h2>
        <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto">
          Following blogs showcase my skills and experience through real-world examples of my work. Each blog is briefly described with links to code
          repositories and live demos.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleFilterClick(category)}
              className={`px-4 py-2 rounded-lg ${activeFilter === category ? "bg-[#915eff] text-white" : "bg-tertiary text-white"}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap gap-7">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={`blog-${index}`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.75, delay: index * 0.5 } },
              }}
              initial="hidden"
              animate="show"
            >
              <Card {...blog} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => handlePrevPage()}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-500" : "bg-[#915eff]"} text-white transition-colors duration-200`}
          >
            Previous
          </button>
          <span className="flex items-center text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handleNextPage()}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages ? "bg-gray-500" : "bg-[#915eff]"
            } text-white transition-colors duration-200`}
          >
            Next
          </button>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-white">Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleItemPerPage(Number(e.target.value))}
              className="bg-tertiary text-white px-2 py-1 rounded-lg"
            >
              {[1, 2, 3, 4, 5, 6, 12, 24].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
