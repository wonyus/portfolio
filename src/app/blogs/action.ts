"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database } from "../../../database.types";
interface BlogFormData {
    page?: string;
    limit?: string;
}

export async function findBlog(formData: BlogFormData) {
    const { page = "1", limit = "10" } = formData;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const skip = (parsedPage - 1) * parsedLimit;
    const end = skip + parsedLimit - 1;

    const supabase = await createClient();

    try {
        const { data: blogs, count } = await supabase
            .from("blogs")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false })
            .range(skip, end);

        const totalPages = Math.ceil((count ?? 0) / parsedLimit);

        return {
            data: blogs ?? [],
            meta: {
                total: count ?? 0,
                page: parsedPage,
                limit: parsedLimit,
                totalPages,
            },
        };
    } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
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

export type Blog = Database["public"]["Tables"]["blogs"]["Row"];

export const getBlogById = async (id: string) => {
    // create supabase client
    const supabase = await createClient();
    // get blog by id
    const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();

    // if error, throw error
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    // return blog
    return data;
};

export async function createBlog(formData: FormData, content: string) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;
    const tagArray = tags.split(",").map((tag) => tag.trim());

    let addImage;
    let imgUrl: string = "";

    if (image.size !== 0) {
        const { data, error } = await supabase.storage.from("blogs").upload(image.name, image, {
            upsert: true,
        });

        if (error) {
            console.log(error);
            return;
        }

        addImage = data;
        imgUrl = supabase.storage.from("blogs").getPublicUrl(addImage?.path as string).data.publicUrl;
    }

    const now = new Date();

    const { status } = await supabase.from("blogs").insert([
        {
            title,
            description,
            content,
            image: imgUrl,
            tags: tagArray,
            published: true,
            id: crypto.randomUUID(),
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
        },
    ]);
    if (status !== 201) {
        return new Error("Failed to create blog");
    }
    revalidatePath("/blogs");
    redirect("/blogs");
}

export async function updateBlog(id: string, formData: FormData, content: string) {
    const supabase = await createClient();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;
    const tagArray = tags.split(",").map((tag) => tag.trim());

    let imgUrl = "";

    if (image.size !== 0) {
        const { data, error } = await supabase.storage.from("blogs").upload(image.name, image, {
            upsert: true,
        });

        if (error) {
            console.log(error);
            return;
        }

        imgUrl = supabase.storage.from("blogs").getPublicUrl(data?.path as string).data.publicUrl;
    }

    const now = new Date();
    const updateData = {
        title,
        description,
        content,
        tags: tagArray,
        updated_at: now.toISOString(),
        ...(image.size !== 0 && { image: imgUrl }),
    };

    const { status } = await supabase.from("blogs").update(updateData).eq("id", id);

    if (status !== 204) {
        return new Error("Failed to update blog");
    }

    revalidatePath("/blogs");
    redirect("/blogs");
}

export async function deleteBlog(id: string) {
    const supabase = await createClient();
    const { status } = await supabase.from("blogs").delete().eq("id", id);

    if (status !== 204) {
        return new Error("Failed to delete blog");
    }

    revalidatePath("/blogs");
    redirect("/blogs");
}
