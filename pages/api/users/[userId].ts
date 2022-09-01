import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/users";
import getDB, { updateUser } from "../../../utils/db";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		User[] | { id: string } | { message: string; error: any }
	>
) {
	try {
		const db = await getDB();
		const users = db.users;

		const userId = req.query.userId as string;

		if (req.method === "GET") {
			const user = users.find((user) => user.id === userId);
			console.log(user);

			if (!user) {
				return res.status(404).end();
			}
			res.status(200).json(user);
		}
		if (req.method === "DELETE") {
			const newUsers = users.filter((user) => {
				user.id !== userId;
			});
			await updateUser(db, newUsers);

			res.status(200).json({ id: userId });
		}
	} catch (err) {
		res
			.status(404)
			.send({ message: "Oops, looks like we made a mistake.", error: err });
	}
}
