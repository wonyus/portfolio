"use server";
import { prisma } from "@/lib/prisma";
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

    const data = await prisma.project.findMany({
        take: parsedLimit,
        skip: (parsedPage - 1) * parsedLimit,
        orderBy: {
            createdAt: "desc",
        },
    });

    const total = await prisma.project.count();

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

export const getProjectById = async (id: string) => {
    const project = await prisma.project.findUnique({
        where: { id: id },
    });
    return project;
};

export async function createProject(formData: FormData) {
    const supabase = await createClient();

    const { data: userData, error } = await supabase.auth.getUser();
    if (error) {
        console.log(error);
        return;
    }
    const title = formData.get("name") as string;
    const description = formData.get("description") as string;
    const sourceCodeLink = formData.get("githubUrl") as string;
    const liveDemoLink = formData.get("liveUrl") as string;
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

    const user = await prisma.user.findUnique({
        where: {
            email: userData.user.email as string,
        },
        select: {
            id: true,
        },
    });

    console.log(user);

    await prisma.project.create({
        data: {
            userId: user?.id ?? "1",
            title,
            description,
            image: imgUrl,
            sourceCodeLink,
            liveDemoLink,
            categories: categoryArray,
            tags: tagArray,
        },
    });

    revalidatePath("/projects");
    redirect("/projects");
}
