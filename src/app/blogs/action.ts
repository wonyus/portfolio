"use server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
interface BlogFormData {
    page?: string;
    limit?: string;
}

export async function findBlog(formData: BlogFormData) {
    const { page = "1", limit = "10" } = formData;
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    const data = await prisma.blog.findMany({
        take: parsedLimit,
        skip: (parsedPage - 1) * parsedLimit,
        orderBy: {
            createdAt: "desc",
        },
    });

    const total = await prisma.blog.count();

    return {
        data,
        meta: {
            total,
            page: parsedPage,
            limit: parsedLimit,
            totalPages: Math.ceil(total / parsedLimit),
        },
    };
}

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
