import { Track } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTrack(trackId: string) {
	return useQuery(
		["tracks", trackId],
		() =>
			fetch(`http://localhost:3000/api/track/${trackId}`).then((res) =>
				res.json()
			),
		{ enabled: Boolean(trackId) }
	);
}

type TrackPrePrisma = {
	title: String;
	completed: Boolean;
	image: String;
	trackId: String;
};

export function useTracks() {
	return useQuery<Track[]>(["tracks"], () =>
		fetch("http://localhost:3000/api/track").then((res) => res.json())
	);
}

export function useCreateTrack() {
	const queryClient = useQueryClient();
	return useMutation(
		["tracks", "create"],
		(track: TrackPrePrisma) => {
			return fetch("http://localhost:3000/api/track", {
				method: "POST",
				body: JSON.stringify(track),
			}).then((res) => res.json());
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["tracks"]);
			},
		}
	);
}

export function useDeleteTrack(trackId: string) {
	const queryClient = useQueryClient();
	return useMutation(
		["tracks", trackId, "delete"],
		() =>
			fetch(`http://localhost:3000/api/track/${trackId}`, {
				method: "DELETE",
			}),
		{ onSuccess: () => queryClient.invalidateQueries(["tracks"]) }
	);
}
