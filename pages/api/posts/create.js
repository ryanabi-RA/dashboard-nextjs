import { supabase } from "../../../libs/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, content } = req.body;

  const { data: posts, error } = await supabase
    .from("posts")
    .insert({ title, content })
    .select();

  if (!posts) return res.status(404).end();

  res.status(200).json({
    message: "Get data posts, successfuly",
    posts,
  });
}
