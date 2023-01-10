import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";

type ResponseData = {
  message: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string;
    content: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") return res.status(405).end();
  const { title, content } = req.body;
  console.log(req.body);

  const { data: posts, error } = await supabase
    .from("post")
    .insert({ title, content })
    .select();

  res.status(200).json({
    message: "Get data posts, successfuly",
    posts,
  });
}
