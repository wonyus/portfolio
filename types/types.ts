import { Database } from "./database.types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
