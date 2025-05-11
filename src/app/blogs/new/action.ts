"use server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

    await prisma.blog.create({
        data: {
            title,
            description,
            content,
            image: imgUrl,
            tags: tagArray,
            published: true,
        },
    });

    revalidatePath("/blogs");
    redirect("/blogs");
}
