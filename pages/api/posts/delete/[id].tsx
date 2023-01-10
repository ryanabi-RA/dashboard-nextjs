import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../libs/supabaseClient";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "DELETE") return res.status(405).end();
  const { id } = req.query;

  const { data, error } = await supabase.from("post").delete().eq("id", id);

  res.status(200).json({
    message: "delete data post, successfuly",
  });
}
