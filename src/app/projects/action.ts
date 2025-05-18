"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ProjectFormData {
    page?: string;
    limit?: string;
}


export async function findProject(formData: ProjectFormData) {
    const { page = "1", limit = "10" } = formData;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;
    const end = skip + parsedLimit - 1;

    const supabase = await createClient();

    try {
        const { data: projects, count } = await supabase
            .from("projects")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(skip, end);

        const totalPages = Math.ceil((count ?? 0) / parsedLimit);

        return {
            data: projects ?? [],
            meta: {
                total: count ?? 0,
                page: parsedPage,
                limit: parsedLimit,
                totalPages,
            },
        };
    } catch (error: any) {
        console.error("Error fetching projects:", error.message);
        return {
            data: [],
            meta: {
                total: 0,
                page: 1,
                limit: 10,
                totalPages: 1,
            },
        };
    }
}

export const getProjectById = async (id: string) => {
    // create supabase client
    const supabase = await createClient();

    // get blog by id
    const { data, error } = await supabase.from("projects").select("*,users(name)").eq("id", id).single();
    // if error, throw error
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    // return blog
    return data;
};

export async function createProject(formData: FormData) {
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
        return;
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const source_code_link = formData.get("source_code_link") as string;
    const live_demo_link = formData.get("live_demo_link") as string;
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;
    const tagArray = tags.split(",").map((tag) => tag.trim());
    const categories = formData.get("categories") as string;
    const categoryArray = categories.split(",").map((category) => category.trim());

    let addImage;
    let imgUrl: string = "";

    if (image.size !== 0) {
        const { data, error } = await supabase.storage.from("projects").upload(image.name, image, {
            upsert: true,
        });

        if (error) {
            console.log(error);
            return;
        }

        addImage = data;
        imgUrl = supabase.storage.from("projects").getPublicUrl(addImage?.path as string).data.publicUrl;
    }
    const email = userData.user.email ?? "";
    const { data } = await supabase.from("users").select("id").eq("email", email).single();

    const now = new Date();
    const {
        status,
        statusText,
        error: createErr,
    } = await supabase.from("projects").insert([
        {
            user_id: data?.id ?? "1",
            title,
            description,
            image: imgUrl,
            source_code_link,
            live_demo_link,
            categories: categoryArray,
            tags: tagArray,
            id: crypto.randomUUID(),
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
        },
    ]);
    if (status !== 201) {
        console.log(statusText, createErr);
        return new Error("Failed to create blog");
    }

    revalidatePath("/projects");
    redirect("/projects");
}

export async function updateProject(id: string, formData: FormData) {
    const now = new Date();
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
        return;
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const source_code_link = formData.get("source_code_link") as string;
    const live_demo_link = formData.get("live_demo_link") as string;
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;
    const tagArray = tags.split(",").map((tag) => tag.trim());
    const categories = formData.get("categories") as string;
    const categoryArray = categories.split(",").map((category) => category.trim());

    let imgUrl = "";
    if (image.size !== 0) {
        const { data, error } = await supabase.storage.from("projects").upload(image.name, image, {
            upsert: true,
        });
        if (error) {
            console.log(error);
            return;
        }
        imgUrl = supabase.storage.from("projects").getPublicUrl(data?.path as string).data.publicUrl;
    }

    const email = userData.user.email ?? "";
    const { data } = await supabase.from("users").select("id").eq("email", email).single();

    const updateData = {
        user_id: data?.id ?? "1",
        title,
        description,
        source_code_link,
        live_demo_link,
        categories: categoryArray,
        tags: tagArray,
        id: crypto.randomUUID(),
        updated_at: now.toISOString(),
        ...(image.size !== 0 && { image: imgUrl }),
    };

    const { status } = await supabase.from("projects").update(updateData).eq("id", id);

    if (status !== 204) {
        return new Error("Failed to update blog");
    }

    revalidatePath("/projects");
    redirect("/projects");
}

export async function deleteProject(id: string) {
    const supabase = await createClient();
    const { status } = await supabase.from("projects").delete().eq("id", id);

    if (status !== 204) {
        return new Error("Failed to delete project");
    }

    revalidatePath("/projects");
    redirect("/projects");
}
