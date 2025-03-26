import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blog.findUnique({
    where: { id: id },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-[#333333]">{blog.title}</h1>
        <div className="prose prose-gray mt-8">{blog.content || "No content available."}</div>
        <Markdown>{blog.content}</Markdown>
      </article>
    </div>
  );
}
