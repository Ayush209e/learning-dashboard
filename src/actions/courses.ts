import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Course } from "@/types/course";

export async function getCourses(): Promise<Course[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at");

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (data ?? []) as Course[];
}
