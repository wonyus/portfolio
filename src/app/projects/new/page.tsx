"use client";
import { projectInputLists } from "@/config/projectInput";
import Form from "next/form";
import { createProject } from "../action";

export default function NewProject() {
    const handleSubmit = async (formData: FormData) => {
        await createProject(formData);
    };

    return (
        <div className="mx-auto max-w-2xl p-4">
            <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>
            <Form action={handleSubmit} className="space-y-6">
                {projectInputLists.map((input) => (
                    <div key={input.name}>
                        <label htmlFor={input.name} className="mb-2 block text-lg font-medium text-gray-200">
                            {input.label}
                        </label>
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
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                    Create Project
                </button>
            </Form>
        </div>
    );
}
