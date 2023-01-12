import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";

type ResponseData = {
  message: string;
  posts: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") return res.status(405).end();

  const { data: posts, error } = await supabase.from("posts").select("*");

  if (!posts) return res.status(404).end();

  res.status(200).json({
    message: "Get data posts, successfuly",
    posts,
  });
}
