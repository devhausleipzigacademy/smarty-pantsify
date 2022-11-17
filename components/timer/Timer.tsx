import { useEffect, useReducer } from "react";

import { PauseButton } from "../buttons/PauseButton";
import { RestartButton } from "../buttons/RestartButton";
import { StopButton } from "../buttons/StopButton";

////////////////////////////////////////////////////
//////////// Types /////////////////////////////////
////////////////////////////////////////////////////
type TimerAction = {
	type: string;
	payload?: any;
};

type TimerValues = {
 activeTime: 0 | 1;
	minutesRemaining: number;
	paused: boolean;
	secondsRemaining: number;
	timeIntervals: [number, number];
	timerDisplay: string;
	timerEnded: boolean;
	timerState: JSX.Element;
};

interface TimerProps {
	task: string;
	resetTimer: ()=> void
}

//customizable values
const breakLengthDefault = 1;
const workLengthDefault = 2;

//
// Reducer Actions hardcoded
//

const ACTIONS = {
	TOGGLE_ACTIVE_TIME: "toggle active time",
	RUN_TIMER: "run timer",
	SECONDS_TO_MINUTES: "convert seconds to minutes",
	TOGGLE_PAUSED: "toggle paused",
	SET_TIME_INTERVALS: "set time intervals",
	TOGGLE_TIMER_DISPLAY: "switch timer display",
	TOGGLE_TIMER_ENDED: "toggle timerEnded",
	SET_TRACK: "set track",
	SET_TOPIC: "set topic",
	SET_TASK: "set task",
	RESET: "reset",
	SET_SELECTOR: "set selector",
	RESTART: "restart",
};

// no magic numbers
// for easily switching between work and break as active time)
const workTime = 0;
const breakTime = 1;

//
// Reducer Function
//

// TODO: seperate timer and task selection
function timerReducer(
	timerValues: TimerValues,
	action: TimerAction
): TimerValues {
	switch (action.type) {
		case ACTIONS.RESTART:
			return {
				...timerValues,
				minutesRemaining: timerValues.timeIntervals[timerValues.activeTime],
				secondsRemaining: 0,
			};
		case ACTIONS.RUN_TIMER:
			return {
				...timerValues,
				secondsRemaining: timerValues.secondsRemaining - 1,
			};
		case ACTIONS.SECONDS_TO_MINUTES:
			return {
				...timerValues,
				secondsRemaining: 59,
				minutesRemaining: timerValues.minutesRemaining - 1,
			};
		case ACTIONS.TOGGLE_ACTIVE_TIME:
			if (timerValues.activeTime === workTime) {
				return { ...timerValues, activeTime: breakTime };
			} else return { ...timerValues, activeTime: workTime };
		case ACTIONS.TOGGLE_PAUSED: {
			return { ...timerValues, paused: !timerValues.paused };
		}
		case ACTIONS.TOGGLE_TIMER_ENDED:
			return { ...timerValues, timerEnded: !timerValues.timerEnded };
		case ACTIONS.SET_TIME_INTERVALS:
			return {
				...timerValues,
				timeIntervals: [action.payload.worktime, action.payload.breaktime],
			};
		case ACTIONS.TOGGLE_TIMER_DISPLAY:
			if (timerValues.timerDisplay === "Working on") {
				return { ...timerValues, timerDisplay: "Break" };
			} else return { ...timerValues, timerDisplay: "Working on" };
		case ACTIONS.RESET:
			return {
				...timerValues,
				activeTime: workTime,
				minutesRemaining: timerValues.timeIntervals[timerValues.activeTime],
				secondsRemaining: 0,
				timerDisplay: "Working on",
				paused: false,
			};
		default:
			return timerValues;
	}
}

///////////////////////////////////////////////////////
// Here is where the React component actually begins///
///////////////////////////////////////////////////////

export function Timer({task, resetTimer}:TimerProps) {
	// bindings for timer lengths and switching between work and break time
	// At some point we can add a function manually set the workLength
	let workLength: number = workLengthDefault;
	let breakLength: number = breakLengthDefault;

	const initialtimerValues: TimerValues = {
		activeTime: workTime,
		minutesRemaining: workLength,
		paused: true,
		secondsRemaining: 0,
		timeIntervals: [workLength, breakLength],
		timerDisplay: "Working on",
		timerEnded: false,
		timerState: (
			<>
				<p>
					Error, timer not working. Please try to refresh the page or contact an
					admin.
				</p>
			</>
		),
	};

	//
	// React Hooks
	//
	// UseReducer
	const [timerValues, dispatch] = useReducer(timerReducer, initialtimerValues);

	// UseEffect (separated by concern)

	// Timer that substracts seconds unless paused
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (!timerValues.paused) {
			interval = setTimeout(() => {
				dispatch({ type: ACTIONS.RUN_TIMER });
			}, 1000);
		}
		return () => {
			clearTimeout(interval);
		};
	});

	// when seconds run out reduce minutes by one and check if timerEnded
	useEffect(() => {
		if (timerValues.secondsRemaining === -1) {
			if (timerValues.minutesRemaining == 0) {
				dispatch({ type: ACTIONS.TOGGLE_TIMER_ENDED });
			} else {
				dispatch({ type: ACTIONS.SECONDS_TO_MINUTES });
			}
		}
	}, [timerValues.secondsRemaining]);

	// switch from break to work - when? only when counter hits zero
	useEffect(() => {
		if (timerValues.timerEnded == true) {
			dispatch({ type: ACTIONS.TOGGLE_ACTIVE_TIME });
			dispatch({ type: ACTIONS.TOGGLE_TIMER_DISPLAY });
			dispatch({ type: ACTIONS.TOGGLE_TIMER_ENDED });
			dispatch({ type: ACTIONS.RESTART });
		}
	}, [timerValues.timerEnded]);

	return (
		<>
			<div className=" flex h-24 w-60 justify-center rounded-xl bg-primary shadow-md">
			<div className="flex h-full w-full justify-end py-2 px-4">
				<div className="flex h-full w-full flex-col items-end justify-center gap-1 pr-4">
					<p className="text-xs">
						{timerValues.timerDisplay}: {task}
					</p>

					<h3 className="text-subheading text-xl font-medium">
						{timerValues.minutesRemaining.toString().padStart(2, "0")}:
						{timerValues.secondsRemaining.toString().padStart(2, "0")} min
					</h3>
				</div>
				<div className="flex h-full flex-col justify-evenly gap-1 py-2">
					<PauseButton
						paused={timerValues.paused}
						clickHandler={() => {
							dispatch({ type: ACTIONS.TOGGLE_PAUSED });
						}}
					/>
					<RestartButton
						clickHandler={() => {
							dispatch({ type: ACTIONS.RESTART });
						}}
					/>
					<StopButton
						clickHandler={() => {
							resetTimer();
						}}
					/>
				</div>
			</div>			</div>
		</>
	);
}