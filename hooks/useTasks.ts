 	import { Task } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTask(taskId: string) {
	return useQuery(
		["task", taskId],
		() =>
			fetch(`http://localhost:3000/api/task/${taskId}`).then((res) =>
				res.json()
			),
		{ enabled: Boolean(taskId) }
	);
}

type TaskPrePrisma = {
	name: String;
	completed: Boolean;
	priority: Boolean;
	deadline: Date;
};

export function useTasks() {
	return useQuery<Task[]>(["tasks"], () =>
		fetch("http://localhost:3000/api/task").then((res) => res.json())
	);
}

export function useCreateTask() {
	const queryClient = useQueryClient();
	return useMutation(
		["tasks", "create"],
		(task: TaskPrePrisma) => {
			return fetch("http://localhost:3000/api/task", {
				method: "POST",
				body: JSON.stringify(task),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tasks"]);
			},
		}
	);
}

export function useUpdateTask(taskId: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["tasks", taskId, "update"],
		(task: TaskPrePrisma) => {
			return fetch(`http://localhost:3000/api/task/${taskId}`, {
				method: "PUT",
				body: JSON.stringify(task),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tasks"]);
			},
		}
	);
}

export function useDeleteTask(taskId: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["tasks", taskId, "delete"],
		() =>
			fetch(`http://localhost:3000/api/task/${taskId}`, {
				method: "DELETE",
			}),
		{ onSuccess: () => queryClient.invalidateQueries(["tasks"]) }
	);
}
