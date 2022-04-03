/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

type PostData = {
  title?: string;
  description?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET": {
      try {
        const response = await conn!.query("SELECT * FROM tasks");
        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
    case "POST": {
      const { title, description } = body as PostData;
      if (!title || !description) {
        return res.status(400).json({ message: "invalid request" });
      }
      const query =
        "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";
      const values = [title, description];

      try {
        const response = await conn?.query(query, values);
        return res.status(201).json(response?.rows?.[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
    default: {
      return res.status(400).json("method not allowed");
    }
  }
};
