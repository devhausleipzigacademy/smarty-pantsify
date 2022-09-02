import { useContext, useEffect, useReducer, useState } from "react";
import { TimerAction, TimerValues } from "../types/TypesNConsts";
import { useTracks, useUser } from "../utilities/axios";
import { findTopic, findTrack } from "../utilities/FinderFunctions";

// The Custom Button is just a placeholder that we can rename and redesign
import { PauseButton } from "./buttons/PauseButton";
import { RestartButton } from "./buttons/RestartButton";
import { StopButton } from "./buttons/StopButton";

//
// Reducer Actions hardcoded
//
const userId = 1234;
const breakLengthDefault = 0;
const workLengthDefault = 0;

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

// for easily switching between the four timer states

const selectTrack = 0;
const selectTopic = 1;
const selectTask = 2;
const allSet = 3;

//
// Reducer Function
//

// TODO: seperate timer and task selection
function timerReducer(
	timerValues: TimerValues,
	action: TimerAction
): TimerValues {
	const user = useUser(userId);
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
			console.log(timerValues.paused);
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
		case ACTIONS.SET_TRACK:
			useUser(userId, { ...user, currentTrack: action.payload.trackId });
			return { ...timerValues, track: action.payload.trackId };
		case ACTIONS.SET_TOPIC:
			useUser(userId, { ...user, currentTopic: action.payload.topicId });
			return { ...timerValues, topic: action.payload.topicId };
		case ACTIONS.SET_TASK:
			useUser(userId, { ...user, currentTask: action.payload.taskId });
			return { ...timerValues, task: action.payload.taskId, paused: false };
		case ACTIONS.RESET:
			return {
				...timerValues,
				track: "select track",
				topic: "select topic",
				task: "select task",
				activeTime: workTime,
				minutesRemaining: timerValues.timeIntervals[timerValues.activeTime],
				secondsRemaining: 0,
				timerDisplay: "Working on",
				paused: false,
				selector: selectTrack,
			};
		case ACTIONS.SET_SELECTOR:
			return { ...timerValues, selector: (timerValues.selector + 1) % 4 };
		default:
			return timerValues;
	}
}

//
// Here is where the React component actually begins
//

export function Timer() {
	//
	// Bindings
	//

	const tracks = useTracks();
	const user = useUser(userId);
	const [activeTrackId, setActiveTrackId] = useState(0);
	const [activeTopicId, setActiveTopicId] = useState(0);

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
		// TODO set up a better default track/topic/task
		track: user.currentTrack,
		topic: user.currentTopic,
		task: user.currentTask,
		selector: allSet,
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

	// Overlays to choose track, topic, and task, respectively

	const trackSelector = (
		<>
			<div className="flex items-center justify-center">
				<select
					className="w-28 bg-transparent "
					required
					name="track"
					id="trackselector"
					value={timerValues.track}
					onChange={(event) => {
						dispatch({
							type: ACTIONS.SET_TRACK,
							payload: { trackId: event.target.value },
						});
						dispatch({ type: ACTIONS.SET_SELECTOR });
					}}
				>
					<option disabled>select track</option>
					{tracks.map((element, idx) => (
						<option key={idx} value={element.id}>
							{element.title}
						</option>
					))}
				</select>
			</div>
		</>
	);
	const topicSelector = (
		<>
			<div className="flex items-center justify-center">
				<select
					className="w-28 bg-transparent"
					required
					name="topic"
					id="topicelector"
					value={timerValues.topic}
					onChange={(event) => {
						dispatch({
							type: ACTIONS.SET_TOPIC,
							payload: { topicId: event.target.value },
						});
						dispatch({ type: ACTIONS.SET_SELECTOR });
					}}
				>
					<option disabled>select topic</option>
					{findTrack(Number(timerValues.track))?.topics.map((element, idx) => (
						<option key={idx} value={element.id}>
							{element.title}
						</option>
					))}
				</select>
			</div>
		</>
	);
	const taskSelector = (
		<>
			<div className="flex items-center justify-center">
				<select
					className="w-28 bg-transparent "
					required
					name="task"
					id="taskselector"
					value={timerValues.task}
					onChange={(event) => {
						dispatch({
							type: ACTIONS.SET_TASK,
							payload: { taskId: event.target.value },
						});
						dispatch({ type: ACTIONS.SET_SELECTOR });
					}}
				>
					<option disabled>select task</option>
					{findTopic(
						Number(timerValues.track),
						Number(timerValues.topic)
					)?.tasks.map((task, idx) => (
						<option key={idx} value={task.id}>
							{task.name}
						</option>
					))}
				</select>
			</div>
		</>
	);

	const timerFullySet = (
		<>
			<div className="flex h-full    w-full  justify-end py-2 px-4">
				<div className="flex h-full w-full flex-col items-end  justify-center gap-1 pr-4">
					<p className="text-xs ">
						{timerValues.timerDisplay}: {timerValues.task}
					</p>

					<h3 className="text-subheading  text-xl font-medium ">
						{timerValues.minutesRemaining.toString().padStart(2, "0")}:
						{timerValues.secondsRemaining.toString().padStart(2, "0")} min
					</h3>
				</div>
				<div className="flex h-full flex-col justify-evenly gap-1 py-2  ">
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
							dispatch({ type: ACTIONS.RESET });
						}}
					/>
				</div>
			</div>
		</>
	);

	let timerState = timerFullySet;

	// what Dan recommended but I could not make work
	// maybe I have to paste in the JSX elements as cases
	// useEffect(() => {
	// switch (timerValues.selector) {
	// 	case selectTrack:
	// 		console.log("case selectTrack:");
	// 		timerState = trackSelector;
	// 		dispatch({ type: ACTIONS.TOGGLE_PAUSED });
	// 		break;
	// 	case selectTopic:
	// 		console.log("case selectTopic:");
	// 		timerState = topicSelector;
	// 		break;
	// 	case selectTask:
	// 		console.log("case selectTask:");
	// 		timerState = taskSelector;
	// 		break;
	// 	case allSet:
	// 		console.log("case allSet:");
	// 		timerState = timerFullySet;
	// 		dispatch({ type: ACTIONS.TOGGLE_PAUSED });
	// 		break;
	// 	default:
	// 		break;
	// }
	// }, [timerValues.selector]);

	if (timerValues.selector === selectTrack) {
		timerState = trackSelector;
		if (!timerValues.paused) dispatch({ type: ACTIONS.TOGGLE_PAUSED });
	} else if (timerValues.selector === selectTopic) {
		timerState = topicSelector;
	} else if (timerValues.selector === selectTask) {
		timerState = taskSelector;
	} else if (timerValues.selector === allSet) {
		timerState = timerFullySet;
		// if (timerValues.paused) dispatch({ type: ACTIONS.TOGGLE_PAUSED });
	}

	return (
		<>
			<div className=" flex h-24  w-60 justify-center rounded-xl bg-primary  shadow-md  ">
				{timerState}
			</div>
		</>
	);
}
