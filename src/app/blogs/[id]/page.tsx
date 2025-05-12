import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogById } from "../action";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogById(id);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center mt-16">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
                <h1 className="text-3xl font-bold mb-8 text-[#cecece]">{blog.title}</h1>
                <Markdown remarkPlugins={[remarkGfm]} children={blog.content} />
            </article>
        </div>
    );
}
