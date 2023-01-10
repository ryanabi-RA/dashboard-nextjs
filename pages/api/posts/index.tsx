import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") return res.status(405).end();

  const { data: posts, error } = await supabase.from("post").select("*");

  // const [posts] = data;

  res.status(200).json({
    message: "Get data posts, successfuly",
    posts,
  });
}
