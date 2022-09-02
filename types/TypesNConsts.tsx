// need to assign and create type for tracks and topics

//TODO: split up types in seperate files
import { Dispatch, ReactNode } from "react";
import { Tracks } from "./tracks";

// In alphabetical order

export type Action = {
	type: string;
	payload: any;
};

export type CreateContext = Dispatch<Action>;

export type ChildrenProps = {
	children: ReactNode;
};

export type CustomButtonProps = {
	text?: string;
	clickHandler: any;
};

export type CustomSwitchProps = {
	text?: string;
	value: boolean | undefined;
	clickHandler: any;
};

export const now = new Date();
export const yesterday: Date = new Date();
yesterday.setDate(yesterday.getDate() - 1);

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

export type Resource = {
	title: string;
	hyperlink: string;
	image: string | HTMLImageElement;
	description: string;
	track: string;
};

export type Resources = Resource[];

export type Task = {
	id: number | string;
	name: string;
	deadline: Date;
	topic: string;
	description?: string;
	priority?: boolean;
	completed?: boolean;
	timeSpentInMinutes?: number;
};

export type TaskProp = {
	task: Task;
};

export type Tasks = Task[];

export type TimerAction = {
	type: string;
	payload?: any;
};

export type TimerDisplay = "Work" | "Break";

export type TimerValues = {
	activeTime: 0 | 1;
	minutesRemaining: number;
	paused: boolean;
	secondsRemaining: number;
	timeIntervals: [number, number];
	timerDisplay: string;
	timerEnded: boolean;
	track?: number | string;
	topic?: number | string;
	task?: number | string;
	selector: number;
	timerState: JSX.Element;
};

export type UserData = {
	name: string;
	imageLink?: string;
	imagePNG?: string;
	activeTrackId: number;
	activeTopicId: number;
	tracks: [...Tracks];
};
