import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../libs/supabaseClient";
import { getData } from "./index";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") return res.status(405).end();

  const { id } = req.query;

  const posts = await getData({ id });

  res.status(200).json({
    message: "Get Detail data posts, successfuly",
    posts,
  });
}
