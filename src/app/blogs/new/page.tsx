"use client";
import { useState } from "react";
import { createBlog } from "./action";
import Form from "next/form";
import { blogInputList } from "@/config/blogInput";
import dynamic from "next/dynamic";

const MdEditorCustom = dynamic(() => import("@/components/MdEditor/MdEditorCustom"), {
  ssr: false,
});

export default function NewBlog() {
  const [mdValue, setMdValue] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    const content = mdValue as string;
    await createBlog(formData, content);
  };

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>
      <Form action={handleSubmit} className="space-y-6">
        {blogInputList.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name} className="mb-2 block text-lg font-medium text-gray-900">
              {input.label}
            </label>
            {input.name === "content" ? (
              <MdEditorCustom value={mdValue} onChange={(value) => setMdValue(value)} />
            ) : (
              <input
                {...{
                  type: input.type,
                  id: input.name,
                  name: input.name,
                  placeholder: input.placeholder,
                  className:
                    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500",
                  required: input.required,
                  ...(input.type === "file" && { accept: input.accept }),
                  ...(input.pattern && { pattern: input.pattern }),
                }}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Create Blog
        </button>
      </Form>
    </div>
  );
}
