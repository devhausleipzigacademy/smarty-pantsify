import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "../../../prisma/db";

import { z, ZodError } from "zod";

export const postUser = z.object({
    name: z.string(),
    image: z.string(),
});

export type PostUser = z.infer<typeof postUser>;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ id: string } | { message: string; error: any }>
) {
    try {
        if (req.method === "POST") {
            const data = postUser.parse(req.body);

            const user = await prisma.user.create({
                data: {
                    ...data,
                },
            });

            res.status(201).json({ id: user.id });
        }
    } catch (err) {
        if (err instanceof ZodError) {
            res.status(422).send({
                message: "Invalid user.",
                error: err,
            });
        }

        res.status(400).send({
            message: "The server encountered an error.",
            error: err,
        });
    }
}
