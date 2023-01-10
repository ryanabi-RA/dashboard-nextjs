import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../libs/supabaseClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  const [user] = data;

  if (!user) return res.status(401).end();

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) return res.status(401).end();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "tokenSecret",
    {
      expiresIn: "7d",
    }
  );
  res.status(200).json({
    message: "Login, successfuly",
    token,
  });
}
