import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Track } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Track[] | { id: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "GET") {
			const { title, completed } = req.query as Record<string, string>;

			const clauses: Array<Prisma.TrackWhereInput> = [];

			if (title) {
				clauses.push({ title: title });
			}

			if (completed) {
				const boolCompleted = JSON.parse(completed);
				clauses.push({ completed: boolCompleted });
			}

			const tracks = await prisma.track.findMany({
				where: {
					AND: clauses,
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			res.status(201).json(tracks);
		}
		if (req.method === "POST") {
			const data = req.body;

			const track = await prisma.track.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ id: track.id });
		}
	} catch (err) {
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
