"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardProps, Card } from "@/components/Card/Card";
import { findProject } from "./action";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { projectPagination } from "@/config/pagination";

const Projects = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<CardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(projectPagination.defaultItemsPerPage);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    const user = await supabase.auth.getUser();
    setUser(user.data.user);
  };

  const fetchAndMapProjects = async (currentPage: number, itemsPerPage: number, filter: string) => {
    const response = await findProject({ page: currentPage.toString(), limit: itemsPerPage.toString() });
    const mappedProjects = response.data.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description || "",
      tags: project.tags || [],
      image: project.image || "",
      sourceCodeLink: project.source_code_link || "",
      liveDemoLink: project.live_demo_link || "",
      category: filter,
    }));
    setTotalPages(Math.ceil(response.meta.total / itemsPerPage));
    return filter === "All" ? mappedProjects : mappedProjects.filter((project) => project.category === filter);
  };

  useEffect(() => {
    const initializeProjects = async () => {
      getUser();
      const projects = await fetchAndMapProjects(currentPage, itemsPerPage, "All");
      setFilteredProjects(projects);
    };
    initializeProjects();
  }, []);

  const handleFilterClick = async (filter: string) => {
    setActiveFilter(filter);
    const projects = await fetchAndMapProjects(currentPage, itemsPerPage, filter);
    setFilteredProjects(projects);
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      const projects = await fetchAndMapProjects(newPage, itemsPerPage, activeFilter);
      setFilteredProjects(projects);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      const projects = await fetchAndMapProjects(newPage, itemsPerPage, activeFilter);
      setFilteredProjects(projects);
    }
  };

  const handleItemPerPage = async (number: number) => {
    setItemsPerPage(number);
    setCurrentPage(1);
    const projects = await fetchAndMapProjects(1, number, activeFilter);
    setFilteredProjects(projects);
  };

  const categories = ["All", ...new Set(filteredProjects.map((project) => project.category))];

  const header = (
    <div>
      <h2 className="text-4xl font-bold text-center">
        My <span className="text-[#915eff]">Projects</span>
      </h2>
      <p className="mt-4 text-primary text-[17px] max-w-3xl leading-[30px] text-center mx-auto">
        Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to
        code repositories and live demos.
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

  const addProjectButton = (
   <div className="flex m-5 top-10 justify-end z-10 sticky">
      <Link href="/projects/new">
        <button className="bg-[#915eff] text-white py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-[#915effe1]">Add New Project</button>
      </Link>
    </div>
  );

  const contents = (
    <div className="mt-20 flex flex-wrap gap-7">
      {filteredProjects.map((project, index) => (
        <motion.div
          key={`project-${index}`}
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
          <Card {...project} />
        </motion.div>
      ))}
    </div>
  );

  const pagination = (
    <div className={`${projectPagination.paginationClass}`}>
      <button
        onClick={() => handlePrevPage()}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? projectPagination.disabledButtonClass : projectPagination.buttonClass}`}
      >
        Prev
      </button>
      <span className="flex items-center text-white text-[14px]">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleNextPage()}
        disabled={currentPage === totalPages}
        className={`${currentPage === totalPages ? projectPagination.disabledButtonClass : projectPagination.buttonClass}`}
      >
        Next
      </button>

      <div className="flex items-center gap-2 ml-4 border-b-gray-600">
        <select value={itemsPerPage} onChange={(e) => handleItemPerPage(Number(e.target.value))} className={projectPagination.selectClass}>
          {projectPagination.itemsPerPageOptions.map((value) => (
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
        {user && addProjectButton}
        {header}
        {category}
        {contents}
        {pagination}
      </div>
    </div>
  );
};

export default Projects;
