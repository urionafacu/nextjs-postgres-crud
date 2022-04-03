/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { id },
    body: { title, description },
  } = req;

  switch (method) {
    case "GET": {
      try {
        const query = "SELECT * FROM tasks WHERE id = $1";
        const values = [id];
        const response = await conn!.query(query, values);
        if (response.rows.length === 0) {
          return res.status(404).json({ message: "task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (_) {
        res.status(500).json({ message: "internal server error" });
      }
    }
    case "PUT": {
      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "title and description required" });
      }
      const query =
        "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
      const values = [title, description, id];
      try {
        const response = await conn!.query(query, values);
        if (response.rows.length === 0) {
          return res.status(404).json({ message: "task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (_) {
        return res.status(500).json({ message: "internal server error" });
      }
    }
    case "DELETE": {
      try {
        const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
        const values = [id];
        const response = await conn!.query(query, values);
        if (response.rowCount === 0) {
          return res.status(404).json({ message: "task not found" });
        }
        return res.status(200).json(response.rows[0]);
      } catch (error) {
        return res.status(500).json({ message: "internal server error" });
      }
    }

    default: {
      return res.status(400).json("method not allowed");
    }
  }
};
