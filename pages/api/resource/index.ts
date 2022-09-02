import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, Resource } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
<<<<<<< Updated upstream
    req: NextApiRequest,
    res: NextApiResponse<
        Resource[] | { id: string } | { message: string; error: any }
    >
=======
	req: NextApiRequest,
	res: NextApiResponse<
		Resource[] | { id: string } | { message: string; error: any } | any
	>
>>>>>>> Stashed changes
) {
    try {
        if (req.method === "GET") {
            const resources = await prisma.resource.findMany({});

<<<<<<< Updated upstream
            res.status(201).json(resources);
        }
        if (req.method === "POST") {
            const data = req.body;
=======
			//TODO: check if groupby works as intended but first need to create resource data in the first place
			const { groupBy } = req.query as Record<string, string>;

			if (groupBy) {
				const resourcesGrouped = await prisma.resource.groupBy({
					by: ["trackId"],
				});

				res.status(201).json(resourcesGrouped);
			}

			//TODO: check if groupby works as intended but first need to create resource data in the first place
			const { groupBy } = req.query as Record<string, string>;

			if (groupBy) {
				const resourcesGrouped = await prisma.resource.groupBy({
					by: ["trackId"],
				});

				res.status(201).json(resourcesGrouped);
			}

			res.status(201).json(resources);
		}
		if (req.method === "POST") {
			const data = req.body;
>>>>>>> Stashed changes

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
