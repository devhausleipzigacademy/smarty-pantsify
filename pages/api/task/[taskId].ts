import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Task | { message: string; error: any }>
) {
    try {
        if (req.method === "GET") {
            const taskId = req.query.taskId as string;

            const task = await prisma.task.findFirstOrThrow({
                where: {
                    id: taskId,
                },
            });

            res.status(201).json(task);
        }
    } catch (err) {
        res.status(404).send({
            message: "Oops, looks like we made a mistake.",
            error: err,
        });
    }
}
