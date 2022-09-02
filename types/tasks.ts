import { Task } from "@prisma/client";

export type InitialTask =
	| Task
	| {
			id?: string;
			name: string;
			deadline: Date | "dd / mm / yyyy";
			topic: string;
			description?: string;
			priority?: boolean;
			completed?: boolean;
	  };

export const initialTask: InitialTask = {
	name: "Name*",
	deadline: "dd / mm / yyyy",
	topic: "default",
	description: "",
};

export type TaskProp = {
	task: Task;
};
