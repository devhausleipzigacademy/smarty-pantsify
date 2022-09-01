import { Topic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Topic | { message: string; error: any }>
) {
  try {
    if (req.method === "GET") {
      const topicId = req.query.topicId as string;

      const topic = await prisma.topic.findFirstOrThrow({
        where: {
          id: topicId,
        },
      });

      res.status(201).json(topic);
    }
  } catch (err) {
    res.status(404).send({
      message: "Oops, looks like we made a mistake.",
      error: err,
    });
  }
}
