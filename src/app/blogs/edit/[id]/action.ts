"use server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBlogById = async (id: string) => {
    const blog = await prisma.blog.findUnique({
        where: { id: id },
    });
    return blog;
};

export async function updateBlog(id: string, formData: FormData, content: string) {
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

    const mapData: {
        title: string;
        description: string;
        content: string;
        tags: string[];
        image?: string;
    } = {
        title,
        description,
        content: content,
        tags: tagArray,
    };

    if (image.size !== 0) {
        mapData.image = imgUrl;
    }

    await prisma.blog.update({
        where: { id: id },
        data: mapData,
    });

    revalidatePath("/blogs");
    redirect("/blogs");
}
