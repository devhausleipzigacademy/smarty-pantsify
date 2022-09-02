import { Track, Topic, Task } from "@prisma/client";

export function findTrack(trackId: number | string): Track | undefined {
	const tracks = useTracks();
	return tracks.find((element) => element.id === trackId);
}

export function findTopic(
	trackId: number | string,
	topicId: number | string
): Topic | undefined {
	const selectedTrack = findTrack(trackId);

	return selectedTrack?.topics.find((element) => element.id === topicId);
}

export function findTask(
	trackId: number | string,
	topicId: number | string,
	taskId: number | string
): Task | undefined {
	const selectedTopic = findTopic(trackId, topicId);

	return selectedTopic?.tasks.find((element) => element.id === taskId);
}
