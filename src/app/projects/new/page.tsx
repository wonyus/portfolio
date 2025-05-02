import { projectInputLists } from "@/config/projectInput";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function NewProject() {
  async function createProject(formData: FormData) {
    "use server";
    const supabase = await createClient();

    const title = formData.get("name") as string;
    const description = formData.get("description") as string;
    const sourceCodeLink = formData.get("githubUrl") as string;
    const liveDemoLink = formData.get("liveUrl") as string;
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;
    const tagArray = tags.split(",").map((tag) => tag.trim());

    // const addImage = async () => {
    //   const { data, error } = await supabase.storage.from("projects").upload(image.name, image);
    //   if (error) {
    //     console.log(error);
    //   }
    //   return data;
    // };

    let addImage;
    if (image) {
      const { data, error } = await supabase.storage.from("projects").upload(image.name, image, {
        upsert: true,
      });
      if (error) {
        console.log(error);
        return;
      }
      addImage = data;
    }
    const imgUrl = supabase.storage.from("projects").getPublicUrl(addImage?.path as string);

    await prisma.project.create({
      data: {
        title,
        description,
        sourceCodeLink,
        liveDemoLink,
        image: imgUrl.data.publicUrl,
        tags: tagArray,
      },
    });

    revalidatePath("/projects");
    redirect("/projects");
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>
      <Form action={createProject} className="space-y-6">
        {projectInputLists.map((input) => (
          <div key={input.name}>
            <label htmlFor={input.name} className="mb-2 block text-lg font-medium text-gray-900">
              {input.label}
            </label>
            <input
              {...{
                type: input.type,
                id: input.name,
                name: input.name,
                placeholder: input.placeholder,
                className: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500",
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
