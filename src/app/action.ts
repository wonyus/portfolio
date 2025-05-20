"use server";
import { createClient } from "@/utils/supabase/client";

export async function findProject() {
    const supabase = createClient();
    try {
        const { data: projects } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false })
            .range(0, 3);
        return {
            data: projects || [],
        };
    } catch (error: any) {
        console.error("Error fetching projects:", error.message);
        return {
            data: [],
        };
    }
}

export async function findBlog() {
    const supabase = createClient();
    try {
        const { data: blogs } = await supabase
            .from("blogs")
            .select("*")
            .order("created_at", { ascending: false })
            .range(0, 2);

        return {
            data: blogs || [],
        };
    } catch (error: any) {
        console.error("Error fetching blogs:", error.message);
        return {
            data: [],
        };
    }
}
