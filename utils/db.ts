import fs from "fs/promises";
import { User } from "../types/users";

interface DB {
	users: User[];
}

export default async function getDB(): Promise<DB> {
	const dbString = await fs.readFile("db.json", { encoding: "utf-8" });
	return JSON.parse(dbString);
}

export async function updateUser(db: DB, updatedUsers: User[]) {
	const updatedDB = { ...db, users: updatedUsers };
	await fs.writeFile("db.json", JSON.stringify(updatedDB));
}
