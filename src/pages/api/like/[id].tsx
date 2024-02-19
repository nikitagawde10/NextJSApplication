import type { NextApiRequest, NextApiResponse } from "next";
import { mockUsers } from "../mock-data";

// Initialize the likes object with the original like counts from mockUsers
let likes: { [key: string]: number } = mockUsers.reduce((acc, user) => {
  // @ts-ignore
  acc[user.id] = user.likes;
  return acc;
}, {});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "POST":
      // Increment likes
      likes[id as string] = (likes[id as string] || 0) + 1;
      return res.status(200).json({ id, likes: likes[id as string] });

    case "PUT":
      // Reset likes
      const newLikes = req.body.likes;
      likes[id as string] = newLikes;
      return res.status(200).json({ id, likes: likes[id as string] });
    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
