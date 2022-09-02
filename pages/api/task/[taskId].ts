import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "@prisma/client";
import { prisma } from "../../../prisma/db";
import { z, ZodError } from "zod";

const putTask = z.object({
	name: z.string(),
	deadline: z.date(),
	completed: z.boolean(),
	priority: z.boolean(),
});

type PutTask = z.infer<typeof putTask>;

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
		if (req.method === "PUT") {
			const data = putTask.parse(req.body);
			const taskId = req.query.taskId as string;

			const updatedTask = prisma.task.update({
				where: {
					id: taskId,
				},
				data: {
					...data,
				},
			});

			res.status(202).json(updatedTask);
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({ message: "Invalid task.", error: err });
		}
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
