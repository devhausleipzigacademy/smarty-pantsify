import { Prisma, Task } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

import { z, ZodError } from "zod";

const postTask = z.object({
	name: z.string().refine((val) => val.length <= 100, {
		message: "name cannot be more than 100 characters",
	}),
	deadline: z.date(),
	topicId: z.string(),
	// TODO: once liz adds her topic hook check if you can use them to validadate the ID
	// .refine((val)=> {const topics = useTopics})
	description: z.string().refine((val) => val.length <= 255, {
		message: "description cannot be more than 255 characters",
	}),
	priority: z.boolean(),
	completed: z.boolean().refine((val) => val === false, {
		message: "newly created task cannot begin as completed: true",
	}),
	timeSpentInMinutes: z.number().refine((val) => val === 0, {
		message: "newly created task begins with no time spent on it.",
	}),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Task[] | { id: string } | { message: string; error: any }>
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
			const data = postTask.parse(req.body);

			const task = await prisma.task.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ id: task.id });
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({
				message: "Invalid Task.",
				error: err,
			});
		}
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
