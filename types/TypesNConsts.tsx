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

export const now = new Date();
export const yesterday: Date = new Date();
yesterday.setDate(yesterday.getDate() - 1);

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
