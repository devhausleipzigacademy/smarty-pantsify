import { NextApiRequest, NextApiResponse } from "next";
import { Resource } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Resource | { message: string; error: any }>
) {
	try {
		if (req.method === "GET") {
			const resourceId = req.query.resourceId as string;

			const resource = await prisma.resource.findFirstOrThrow({
				where: {
					id: resourceId,
				},
			});

			res.status(201).json(resource);
		}
	} catch (err) {
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
