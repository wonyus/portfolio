import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { deleteBlog, getBlogById } from "../action";
import { createClient } from "@/utils/supabase/server";
import { DeleteButton } from "@/components/Buttons/DeleteButton";

/**
 * Renders a blog post page with Markdown content and an edit link for authenticated users.
 *
 * Awaits the blog post ID from the provided parameters, fetches the corresponding blog post, and displays its content. If the blog post does not exist, redirects to a not found page. Authenticated users are shown a link to edit the blog post.
 *
 * @param params - A promise resolving to an object containing the blog post ID.
 *
 * @returns The rendered blog post page as a React element.
 *
 * @remark Redirects to a not found page if the blog post with the given ID does not exist.
 */
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    return (
        <div className="min-h-screen flex flex-col items-center justify-start">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
                {user.data.user !== null && (
                    <div about="action" className="justify-items-start w-full">
                        <a href={`/blogs/${id}/edit`}>
                            <button className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </button>
                        </a>
                        <DeleteButton id={id} callback={deleteBlog} />
                    </div>
                )}
                <h1 className="text-3xl font-bold mb-8 text-[#cecece]">{blog.title}</h1>
                <Markdown remarkPlugins={[remarkGfm]} children={blog.content} />
            </article>
        </div>
    );
}
