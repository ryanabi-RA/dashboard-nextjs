import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../libs/supabaseClient";

type ResponseData = {
  message: string;
  //   Posts: {
  //     id: number;
  //     title: string;
  //     content: string;
  //     created_at: string;
  //     updated_at: string;
  //   };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  let { data, error } = await supabase.from("post").select("*").eq("id", id);

  const [posts] = data;

  res.status(200).json({
    message: "Get Detail data posts, successfuly",
    posts,
  });
}
