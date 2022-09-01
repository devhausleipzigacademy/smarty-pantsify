import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { prisma } from "../../../prisma/db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ id: string } | { message: string; error: any }>
) {
    try {
        if (req.method === "POST") {
            const data = req.body;

            const user = await prisma.user.create({
                data: {
                    ...data,
                },
            });

            res.status(201).json({ id: user.id });
        }
    } catch (err) {
        res.status(404).send({
            message: "Oops, looks like we made a mistake.",
            error: err,
        });
    }
}
