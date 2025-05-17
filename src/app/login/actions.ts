"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);
    console.log(error);
    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { data: user } = await supabase.from("users").select("email").eq("email", data.email).single();

    if (user) {
        await login(formData);
    }

    // type-casting here for convenience
    // in practice, you should validate your inputs

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/error");
    }

    await supabase.from("users").insert({
        id: crypto.randomUUID(),
        email: data.email,
        name: data.email.split("@")[0],
        updated_at: new Date().toISOString(),
    });

    revalidatePath("/", "layout");
    redirect("/");
}
