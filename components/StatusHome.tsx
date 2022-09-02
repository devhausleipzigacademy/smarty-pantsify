import { useEffect } from "react";
import { StatusSVG } from "../public/Status";
import { useTasks } from "../utilities/axios";

export function StatusHome() {
	const tasks = useTasks();

	let taskCount = tasks.length;
	let taskCompletedCount = tasks.filter((task) => task.completed).length;
	let taskCompletionPercentage =
		taskCount == 0 ? 0 : (taskCompletedCount / taskCount) * 100;

	let completionMessage =
		taskCompletionPercentage > 50
			? "Great work! You’ve completed the majority of your tasks."
			: "You have completed less than half your tasks. Keep it up!";

	useEffect(() => {}, [completionMessage]);
	return (
		<>
			<h3 className="card-heading">Your Progress</h3>
			<div className="flex flex-col items-center justify-between w-full gap-2 p-4 h-5/6">
				<StatusSVG progress={taskCompletionPercentage} />

				<p className="w-7/12 text-xs text-center">{completionMessage}</p>
			</div>
		</>
	);
}
