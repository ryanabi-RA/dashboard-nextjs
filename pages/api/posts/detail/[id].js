import { supabase } from "../../../../libs/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  let { data: posts, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id);

  if (!posts) return res.status(404).end();

  res.status(200).json({
    message: "Get Detail data posts, successfuly",
    posts,
  });
}
