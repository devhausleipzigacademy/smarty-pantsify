import { User } from "@prisma/client";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";

export function useUser(userId: string) {
	return useQuery<User>(
		["users", userId],
		() =>
			fetch(`http://localhost:3000/api/user/${userId}`).then((res) =>
				res.json()
			)
	);
}

type UserPrePrisma = {
	name: String;
	image: String;
};

export function useUsers() {
	return useQuery<User[]>(["users"], () =>
		fetch("http://localhost:3000/api/user").then((res) => res.json())
	);
}

export function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation(
		["users", "create"],
		(user: UserPrePrisma) => {
			return fetch("http://localhost:3000/api/user", {
				method: "POST",
				body: JSON.stringify(user),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["users"]);
			},
		}
	);
}

export function useDeleteUser(userId: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["users", userId, "delete"],
		() =>
			fetch(`http://localhost:3000/api/user/${userId}`, {
				method: "DELETE",
			}),
		{ onSuccess: () => queryClient.invalidateQueries(["users"]) }
	);
}
