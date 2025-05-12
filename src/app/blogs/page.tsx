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
    const [isLoading, setIsLoading] = useState(true);

    const fetchAndMapBlogs = async (currentPage: number, itemsPerPage: number, filter: string) => {
        setIsLoading(true);
        const response = await findBlog({ page: currentPage.toString(), limit: itemsPerPage.toString() });
        const mappedBlogs = response.data.map((blog) => ({
            id: blog.id,
            title: blog.title || "",
            description: blog.description || "",
            tags: blog.tags,
            image: blog.image || "",
            category: filter,
        }));
        setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
        setIsLoading(false);
        return filter === "All" ? mappedBlogs : mappedBlogs.filter((blog) => blog.category === filter);
    };

    useEffect(() => {
        const initializeBlogs = async () => {
            setIsLoading(true);
            const blogs = await fetchAndMapBlogs(currentPage, itemsPerPage, "All");
            setFilteredBlogs(blogs);
            setMounted(true);
            setIsLoading(false);
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
        setIsLoading(true);
        const blogs = await fetchAndMapBlogs(1, number, activeFilter);
        setFilteredBlogs(blogs);
        setIsLoading(false);
    };
    const categories = [...filteredBlogs.map((blog) => blog.category)];

    if (!mounted) return null;

    const header = (
        <div>
            <h2 className="text-4xl font-bold text-center">
                My <span className="text-[#915eff]">Blogs</span>
            </h2>
            <p className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center mx-auto">
                Following blogs showcase my skills and experience through real-world examples of my work. Each blog is
                briefly described with links to code repositories and live demos.
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
        <div className="mt-2 flex flex-wrap gap-7">
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
                    <Card {...blog} isLoading={isLoading} />
                </motion.div>
            ))}
        </div>
    );

    const pagination = (
        <div className="flex justify-center gap-4 mt-5">
            <button
                onClick={() => handlePrevPage()}
                disabled={currentPage === 1}
                className={`px-2 rounded-lg ${
                    currentPage === 1 ? "bg-gray-500" : "bg-[#915eff]"
                } text-white text-[14px] transition-colors duration-200`}
            >
                Prev
            </button>
            <span className="flex items-center text-white text-[14px]">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => handleNextPage()}
                disabled={currentPage === totalPages}
                className={`px-2 rounded-lg ${
                    currentPage === totalPages ? "bg-gray-500" : "bg-[#915eff]"
                } text-white text-[14px] transition-colors duration-200`}
            >
                Next
            </button>

            <div className="flex items-center gap-2 ml-4 border-b-gray-600">
                <select
                    value={itemsPerPage}
                    onChange={(e) => handleItemPerPage(Number(e.target.value))}
                    className="bg-tertiary text-white  py-1 rounded-lg"
                >
                    {[1, 2, 3, 4, 5, 6, 12, 24].map((value) => (
                        <option key={value} value={value} className="text-[14px]">
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );

    return (
        <div className="relative z-0 min-h-full max-w-7xl mx-auto">
            <div className="flex flex-col">
                {header}
                {category}
                {contents}
                {pagination}
            </div>
        </div>
    );
};

export default Blogs;
