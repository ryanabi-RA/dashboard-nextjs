import { request } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import authorization from "../../../middlewares/authorization";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") return res.status(405).end();

  const auth = await authorization(req, res);

  res.status(200).json({
    message: "Log out, successfuly",
  });
}
