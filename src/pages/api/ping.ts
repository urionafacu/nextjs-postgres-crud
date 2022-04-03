/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponse, NextApiRequest } from "next";
import { conn } from "src/utils/database";

type Data = {
  message: string;
  time?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await conn!.query("SELECT NOW()");
    return res
      .status(200)
      .json({ message: "pong", time: response?.rows[0]?.now });
  } catch (error) {
    return res.status(400).json({ message: "connection error" });
  }
};
