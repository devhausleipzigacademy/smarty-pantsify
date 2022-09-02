import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Track } from "@prisma/client";
import { prisma } from "../../../prisma/db";

import { z, ZodError } from "zod";
import tracks from "../../../prisma/dummyData/trackDummies";
import trackDummies from "../../../data/trackDummies";

const postTrack = z.object({
	title: z.string(),
});

export type postTrack = z.infer<typeof postTrack>;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Track[] | { id: string } | { message: string; error: any }
	>
) {
	try {
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
