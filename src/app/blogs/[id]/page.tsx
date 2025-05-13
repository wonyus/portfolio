import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogById } from "../action";
import { createClient } from "@/utils/supabase/server";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    const supabase = await createClient();
    const user = await supabase.auth.getUser();
    return (
        <div className="min-h-screen flex flex-col items-center justify-center mt-16">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
                {user.data.user !== null && (
                    <a href={`/blogs/edit/${id}`} className="text-blue-600">
                        go to edit
                    </a>
                )}
                <h1 className="text-3xl font-bold mb-8 text-[#cecece]">{blog.title}</h1>
                <Markdown remarkPlugins={[remarkGfm]} children={blog.content} />
            </article>
        </div>
    );
}
