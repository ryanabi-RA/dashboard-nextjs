import { supabase } from "../../../../libs/supabaseClient";

export async function getData({ id }) {
  let { data: posts, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id);

  return posts;
}
