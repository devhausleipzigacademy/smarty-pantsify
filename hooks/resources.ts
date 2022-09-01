import { Resource } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useResource(resourceId: string) {
	return useQuery(
		["resource", resourceId],
		() =>
			fetch(`http://localhost:3000/api/resources/${resourceId}`).then((res) =>
				res.json()
			),
		{ enabled: Boolean(resourceId) }
	);
}

type ResourcePrePrisma = {
	url: String;
	text: String;
	image: String;
	trackId: String;
};

export function useResources() {
	return useQuery<Resource[]>(["resources"], () =>
		fetch("http://localhost:3000/api/resources").then((res) => res.json())
	);
}

export function useCreateResource() {
	const queryClient = useQueryClient();
	return useMutation(
		["resources", "create"],
		(resource: ResourcePrePrisma) => {
			return fetch("http://localhost:3000/api/resource", {
				method: "POST",
				body: JSON.stringify(resource),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["resources"]);
			},
		}
	);
}

export function useDeleteResource(resourceId: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["resources", resourceId, "delete"],
		() =>
			fetch(`http://localhost:3000/api/resources/${resourceId}`, {
				method: "DELETE",
			}),
		{ onSuccess: () => queryClient.invalidateQueries(["resources"]) }
	);
}
