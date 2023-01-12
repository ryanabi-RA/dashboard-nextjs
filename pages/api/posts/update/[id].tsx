import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../libs/supabaseClient";

type ResponseData = {
  message: string;
  posts: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "PUT") return res.status(405).end();
  const { id } = req.query;
  const { title, content } = req.body;

  const { data: posts, error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id)
    .select("*");

  if (!posts) return res.status(404).end();

  res.status(200).json({
    message: "Update data post, successfuly",
    posts,
  });
}
