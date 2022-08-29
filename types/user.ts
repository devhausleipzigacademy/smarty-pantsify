export type User = {
	id: number;
	name: string;
	image: string;
	currentTrack?: number | string;
	currentTopic?: number | string;
	currentTask?: number | string;
};
