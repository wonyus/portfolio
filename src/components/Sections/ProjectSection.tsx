import { projectImageUrl } from "@/config/images";
import { Project } from "@/types/types";
import Image from "next/image";
import GithubIcon from "../SVGs/GithubIcon";
import LinkIcon from "../SVGs/LinkIcon";
import Link from "next/link";

const ProjectSection = (projects: Project[]) => {
    const header = (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-3 pb-12 text-center">Latest Project</h2>
    );

    const iconBtn = ({
        source_code_link,
        live_demo_link,
    }: {
        source_code_link: string | null;
        live_demo_link: string | null;
    }) =>
        source_code_link || live_demo_link ? (
            <div className="absolute flex justify-end m-2 card-img_hover h-10">
                {source_code_link && (
                    <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center z-10">
                        <Link href={source_code_link} target="_blank">
                            <GithubIcon className="hover:fill-purple-500/40 hover:brightness-100 cursor-pointer transition delay-100 duration-300 ease-out hover:-translate-y-1 hover:scale-120" />
                        </Link>
                    </div>
                )}
                {live_demo_link && (
                    <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center ml-2 z-10">
                        <Link href={live_demo_link} target="_blank">
                            <LinkIcon className="text-purple-400 hover:text-purple-400 hover:brightness-100 cursor-pointer transition delay-100 duration-300 ease-out hover:-translate-y-1 hover:scale-120" />
                        </Link>
                    </div>
                )}
            </div>
        ) : null;

    const card = ({ id, image, description, title, tags, source_code_link, live_demo_link }: Project) => (
        <div key={id}>
            {iconBtn({ source_code_link, live_demo_link })}
            <div className="w-full">
                <Image
                    src={image || projectImageUrl} // Fallback image if none provided
                    alt={title}
                    width={1536}
                    height={1024}
                    sizes="lg"
                    loading="lazy"
                    className="w-full object-cover rounded-2xl justify-around content-around brightness-80 hover:brightness-100 transition-all duration-300 ease-in-out"
                />
            </div>
            <div className="bg-white dark:bg-gray-800/5 rounded-lg shadow-lg p-2">
                <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-[14px] text-gray-700 dark:text-gray-300 mb-4">
                    {description.length < 99 ? description : `${description.slice(0, 100)}...`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags &&
                        tags.map((tag, index) => (
                            <span
                                key={`tag-${tag}-${index}`}
                                className="text-[12px] text-violet-600 dark:text-violet-400"
                            >
                                #{tag}
                            </span>
                        ))}
                </div>
                <div className="mt-4">
                    <a
                        href={`/projects/${id}`}
                        className="hover:no-underline text-violet-600 dark:text-violet-700/70 hover:text-violet-800 dark:hover:text-violet-500 transition-colors duration-300"
                    >
                        Read more
                    </a>
                </div>
            </div>
        </div>
    );
    return (
        <section>
            <div className="container mx-auto px-4 py-8">
                {header}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((blog) => card(blog))}
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;
