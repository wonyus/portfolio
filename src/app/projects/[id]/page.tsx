import { notFound } from "next/navigation";
import { deleteProject, getProjectById } from "../action";
import { createClient } from "@/utils/supabase/server";
import { DeleteButton } from "@/components/Buttons/DeleteButton";

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    return (
        <div className="min-h-screen flex flex-col items-center justify-start">
            <article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
                {user.data.user !== null && (
                    <div about="action" className="justify-items-start w-full">
                        <a href={`/projects/${id}/edit`}>
                            <button className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                            </button>
                        </a>
                        <DeleteButton id={id} callback={deleteProject} />
                    </div>
                )}
                <h1 className="text-4xl font-bold mb-8 text-[#cecece]">{project.title}</h1>
                <p className="text-gray-600 text-center">by {project.users?.name ?? "annonymoues"}</p>
                <div className="prose prose-gray mt-8">{project.description || "No content available."}</div>
            </article>
        </div>
    );
}
