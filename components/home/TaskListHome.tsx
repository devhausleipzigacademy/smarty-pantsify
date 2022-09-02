import { useEffect, useState } from "react";
import { useTasks, useUpdateTask } from "../../hooks/useTasks";
import handler from "../../pages/api/tracks";
import { TaskProp } from "../../types/tasks";
import { StarButton } from "../buttons/StarButton";

export function TaskListHome() {
	const { data: tasks, isLoading: tasksLoading } = useTasks();

	if (tasksLoading) return <p>Loading</p>;
	if (!tasksLoading && tasks === undefined) return <p>user not found</p>;

	return (
		<div>
			<h3 className="card-heading">Upcoming Tasks</h3>
			<ul className="px-4 py-2">
				{tasks
					// .sort(
					//   (a: Task, b: Task) => a.deadline.getTime() - b.deadline.getTime()
					// )
					.filter((task) => !task.completed ?? false)
					.splice(0, 5)
					.map((task) => (
						<li
							key={task.id}
							className="flex h-9 items-center justify-between gap-2  rounded-md border-r border-b bg-white p-3"
						>
							<TaskItem task={task} />
						</li>
					))}
			</ul>
		</div>
	);
}

function TaskItem({ task }: TaskProp) {
	const date = JSON.stringify(task.deadline).slice(1, 11);
	const { mutateAsync } = useUpdateTask(task.id);
	const [completed, setCompleted] = useState(task.completed);

	useEffect(() => {
		const { id, ...taskWithoutId } = task;
		mutateAsync({
			...taskWithoutId,
			completed,
		});
	}, [completed]);

	return (
		<>
			<div className="flex h-full w-full flex-row items-center gap-5">
				<input
					type="checkbox"
					checked={completed}
					onChange={() => setCompleted((prev) => !prev)}
					name="completed"
				/>

				<p className="text-xs">{task.name}</p>

				<p className="text-xs text-customTextColorLight ">Due: {date}</p>
			</div>
			<StarButton
				value={task.priority}
				clickHandler={() => {
					useUpdateTask(task.id);
				}}
			/>
		</>
	);
}
