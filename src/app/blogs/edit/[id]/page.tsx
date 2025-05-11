"use client";
import { blogInputList } from "@/config/blogInput";
import dynamic from "next/dynamic";
import Form from "next/form";
import { notFound, useParams } from "next/navigation";
import { getBlogById, updateBlog } from "./action";
import { useEffect, useState } from "react";
import { InputListProps } from "@/config/interface";
import { Blog } from "@prisma/client";

const MdEditorCustom = dynamic(() => import("@/components/MdEditor/MdEditorCustom"), {
    ssr: false,
});

export default function Edit() {
    const [init, setInit] = useState(false);
    const [blog, setBlog] = useState<Blog>();
    const [inputList, setInputList] = useState<InputListProps[]>([]);
    const [mdValue, setMdValue] = useState<string>("");

    const params = useParams<{ id: string }>();

    const mapResponseToInputList = (res: Blog) => {
        return blogInputList.map((input) => {
            if (input.name === "content") {
                setMdValue(res?.content ?? "");
            }
            if (input.name === "image") {
                return {
                    ...input,
                };
            }
            return {
                ...input,
                value: res?.[input.name as keyof Blog],
            };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getBlogById(params.id);
            if (res) {
                setBlog(res);
                setInputList(mapResponseToInputList(res));
            }
            setInit(true);
        };

        fetchData();
    }, [params.id]);

    if (!blog && init) {
        notFound();
    }

    const handleSubmit = async (formData: FormData) => {
        await updateBlog(params.id, formData, mdValue);
    };

    const renderInput = (input: InputListProps) => (
        <div key={input.name}>
            <label htmlFor={input.name} className="mb-2 block text-md font-medium text-gray-200">
                {input.label}
            </label>
            {input.name === "content" ? (
                <MdEditorCustom value={mdValue} onChange={setMdValue} />
            ) : (
                <input
                    type={input.type}
                    id={input.name}
                    name={input.name}
                    placeholder={input.placeholder}
                    defaultValue={input.value}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    required={input.required}
                    {...(input.type === "file" && { accept: input.accept })}
                    {...(input.pattern && { pattern: input.pattern })}
                />
            )}
        </div>
    );

    return (
        <div className="mx-auto max-w-2xl p-4">
            <h1 className="mb-2 text-2xl font-bold">Create New Project</h1>
            <Form action={handleSubmit} className="space-y-6">
                {inputList.map(renderInput)}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Update Blog
                </button>
            </Form>
        </div>
    );
}
