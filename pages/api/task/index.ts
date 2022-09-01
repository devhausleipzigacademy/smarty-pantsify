import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Task } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Task[] | { id: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "GET") {
			const { priority, completed, name } = req.query as Record<string, string>;

			const clauses: Array<Prisma.TaskWhereInput> = [];

			if (priority) {
				const boolPriority = JSON.parse(priority);
				clauses.push({ priority: boolPriority });
			}

			if (completed) {
				const boolCompleted = JSON.parse(completed);
				clauses.push({ completed: boolCompleted });
			}

			if (name) {
				clauses.push({
					name: { contains: name as string },
				});
			}

			console.log(clauses);

			const tasks = await prisma.task.findMany({
				where: {
					AND: clauses,
				},
				orderBy: {
					timeSpentInMinutes: "desc",
				},
			});

			res.status(201).json(tasks);
		}
		if (req.method === "POST") {
			const data = req.body;

			const task = await prisma.task.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ id: task.id });
		}
	} catch (err) {
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
