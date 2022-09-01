import { Prisma, Topic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Topic[] | { id: string } | { message: string; error: any }
  >
) {
  try {
    if (req.method === "GET") {
      const { title, completed } = req.query as Record<string, string>;

      const clauses: Array<Prisma.TopicWhereInput> = [];

      if (title) {
        clauses.push({ title: title });
      }

      if (completed) {
        const boolCompleted = JSON.parse(completed);
        clauses.push({ completed: boolCompleted });
      }

      console.log(clauses);

      const topicsResponse = await prisma.topic.findMany({
        where: {
          AND: clauses,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(201).json(topicsResponse);
    }
    if (req.method === "POST") {
      const data = req.body;

      const topic = await prisma.topic.create({
        data: {
          ...data,
        },
      });

      res.status(201).json({ id: topic.id });
    }
  } catch (err) {
    res.status(404).send({
      message: "Oops, looks like we made a mistake.",
      error: err,
    });
  }
}
