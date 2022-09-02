import { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import StatusSVG from "../../public/svgs/StatusSVG";

export function StatusHome() {
	// TODO: create useTasks custom hook
	const { data: tasks, isLoading: tasksLoading } = useTasks();
	const [percentage, setPercentage] = useState(0);
	const [statusMessage, setStatusMessage] = useState("Loading");

	useEffect(() => {
		if (tasks) {
			let taskCount = tasks.length;
			console.log(taskCount);
			let taskCompletedCount = tasks.filter((task) => task.completed).length;

			let taskCompletionPercentage =
				taskCount == 0 ? 0 : (taskCompletedCount / taskCount) * 100;

			let completionMessage =
				taskCompletionPercentage > 50
					? "Great work! You’ve completed the majority of your tasks."
					: "You have completed less than half your tasks. Keep it up!";
			console.log("taskcompleted", taskCompletedCount);
			setPercentage(taskCompletionPercentage);
			setStatusMessage(completionMessage);
		}
	}, [tasks]);

	if (tasksLoading) return <p>Loading</p>;
	if (!tasksLoading && tasks === undefined) return <p>user not found</p>;

	return (
		<>
			<h3 className="card-heading">Your Progress</h3>
			<div className="flex h-5/6 w-full flex-col items-center justify-between gap-2 p-4">
				<StatusSVG progress={percentage} />

				<p className="w-7/12 text-center text-xs">{statusMessage}</p>
			</div>
		</>
	);
}
