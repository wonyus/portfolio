"use server";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData, content: string) {
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const tags = formData.get("tags") as string;
  const tagArray = tags.split(",").map((tag) => tag.trim());

  let addImage;
  if (image) {
    const { data, error } = await supabase.storage.from("blogs").upload(image.name, image, {
      upsert: true,
    });
    if (error) {
      console.log(error);
      return;
    }
    addImage = data;
  }
  const imgUrl = supabase.storage.from("blogs").getPublicUrl(addImage?.path as string);

  await prisma.blog.create({
    data: {
      title,
      content,
      image: imgUrl.data.publicUrl,
      tags: tagArray,
      published: true,
    },
  });

  revalidatePath("/blogs");
  redirect("/blogs");
}
