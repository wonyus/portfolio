import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];

export type TypedSupabaseClient = SupabaseClient<Database>