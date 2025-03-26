"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { createUser, getUserByEmail } from "@/utils/prisma/user";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const email = await getUserByEmail(data.email);

  if (email) {
    await login(formData);
  }

  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  await createUser({ email: data.email, name: data.email.split("@")[0] });

  revalidatePath("/", "layout");
  redirect("/");
}
