import { NextApiRequest, NextApiResponse } from "next";
import { User, Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User | { message: string; error: any }>
) {
    try {
        if (req.method === "GET") {
            const userId = req.query.userId as string;

            const user = await prisma.user.findFirstOrThrow({
                where: {
                    id: userId,
                },
            });

            res.status(201).json(user);
        }
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(404).send({
                message: "User cannot be found.",
                error: err,
            });
        }

        res.status(400).send({
            message: "The server encountered an error.",
            error: err,
        });
    }
}
