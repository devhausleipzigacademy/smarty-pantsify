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

		if (req.method === "GET") {
			res.status(200).json(users);
		}
		if (req.method === "POST") {
			const parsed = JSON.parse(req.body);
			const newUser = {
				id: nanoid(),
				name: parsed.name,
				image: parsed.image,
				currentTrack: parsed.currentTrack,
				currentTopic: parsed.currentTopic,
				currentTask: parsed.currentTask,
				// update this for new user
			};
			const newUsers = [...users, newUser];
			await updateUser(db, newUsers);

			res.status(201).json({ id: newUser.id });
		}
	} catch (err) {
		res
			.status(404)
			.send({ message: "Oops, looks like we made a mistake.", error: err });
	}
}
