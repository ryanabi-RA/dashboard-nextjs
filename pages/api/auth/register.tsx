import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";
import bcrypt from "bcryptjs";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const { data: users, error } = await supabase
    .from("users")
    .insert({ email, password: passwordHash })
    .select("*");

  res.status(200).json({
    message: "Register user, successfuly",
  });
}
