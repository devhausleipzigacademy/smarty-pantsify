import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Resource } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Resource[] | { id: string } | { message: string; error: any }
	>
) {
	try {
		if (req.method === "GET") {
			const resources = await prisma.resource.findMany({});

			res.status(201).json(resources);
		}
		if (req.method === "POST") {
			const data = req.body;

			const resource = await prisma.resource.create({
				data: {
					...data,
				},
			});

			res.status(201).json({ id: resource.id });
		}
	} catch (err) {
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
