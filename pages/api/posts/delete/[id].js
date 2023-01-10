import { supabase } from "../../../../libs/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { id } = req.query;

  const { data: posts, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id);

  if (!posts) return res.status(404).end();

  res.status(200).json({
    message: "delete data post, successfuly",
  });
}
