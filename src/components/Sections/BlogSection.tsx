import { blogImageUrl } from "@/config/images";
import { Blog } from "@/types/types";
import Image from "next/image";

const BlogSection = (blogs: Blog[]) => {
    const header = <h2 className="text-3xl font-bold text-gray-900 dark:text-white m-3 pb-12">Latest Blog Posts</h2>;

    const card = ({ id, image, description, title, tags }: Blog) => (
        <div key={id}>
            <div className="w-full">
                <Image
                    src={image || blogImageUrl} // Fallback image if none provided
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
                        href={`/blogs/${id}`}
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
                    {blogs.map((blog) => card(blog))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
