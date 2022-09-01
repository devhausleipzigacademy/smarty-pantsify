import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
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
        res.status(404).send({
            message: "Oops, looks like we made a mistake.",
            error: err,
        });
    }
}
