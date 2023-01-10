import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../libs/supabaseClient";

type ResponseData = {
  message: string;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  id: number;
  body: {
    title: string;
    content: string;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "PUT") return res.status(405).end();
  const { id } = req.query;
  const { title, content } = req.body;

  const { data: posts, error } = await supabase
    .from("post")
    .update({ title, content })
    .select("*")
    .eq("id", id);

  res.status(200).json({
    message: "Update data post, successfuly",
    posts,
  });
}
