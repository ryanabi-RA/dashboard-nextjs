import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";

type ResponseData = {
  message: string;
};

export async function getData() {
  const { data: posts, error } = await supabase.from("post").select("*");
  return posts;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") return res.status(405).end();

  const posts = await getData();

  res.status(200).json({
    message: "Get data posts, successfuly",
    posts,
  });
}
