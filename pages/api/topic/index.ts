import { Prisma, Topic } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import { z, ZodError } from "zod";

const postTopic = z.object({
	title: z.string().refine((val) => val.length <= 100, {
		message: "name cannot be more than 100 characters",
	}),
	completed: z.boolean().refine((val) => val === false, {
		message: "newly created task cannot begin as completed: true",
	}),
	//  TODO: same as with tasks: once we have a hook we can try and validate the trackId
	trackId: z.string(),
});

type PostTopic = z.infer<typeof postTopic>;

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
			const data = postTopic.parse(req.body);

			const topic = await prisma.topic.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ id: topic.id });
		}
	} catch (err) {
		if (err instanceof ZodError) {
			res.status(422).send({
				message: "Invalid topic.",
				error: err,
			});
		}
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
