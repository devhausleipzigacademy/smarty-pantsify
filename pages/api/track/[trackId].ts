import { Track } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Track | { message: string; error: any }>
) {
	try {
		if (req.method === "GET") {
			const trackId = req.query.trackId as string;

			const track = await prisma.track.findFirstOrThrow({
				where: {
					id: trackId,
				},
			});

			res.status(201).json(track);
		}
	} catch (err) {
		res.status(404).send({
			message: "Oops, looks like we made a mistake.",
			error: err,
		});
	}
}
