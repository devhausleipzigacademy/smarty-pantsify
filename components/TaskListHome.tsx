import { useEffect, useState } from "react";

import { Task, Tasks } from "../types/tasks";
import { Track } from "../types/tracks";
import { TaskProp } from "../types/TypesNConsts";
import { useTasks } from "../utilities/axios";

export function TaskListHome() {
	const tasks = useTasks();

	if (!tasks.length) {
		return <p>Oops, looks like you haven't added anything yet</p>;
	}

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
							className="flex items-center justify-between gap-2 p-3 bg-white border-b border-r rounded-md h-9"
						>
							<TaskItem task={task} />
						</li>
					))}
			</ul>
		</div>
	);
}

function TaskItem({ task }: TaskProp) {
	// I will probably need these here
	//   const dispatch = useTasksDispatch() as CreateContext;

	const date = JSON.stringify(task.deadline).slice(1, 11);

	return (
		<>
			<div className="flex flex-row items-center w-full h-full gap-5">
				<input
					type="checkbox"
					name="completed"
					//   onChange={() => {
					//     dispatch({ type: ACTIONS.COMPLETED, payload: { id: task.id } });
					//   }}
				/>

				<p className="text-xs">{task.name}</p>

				<p className="text-xs text-customTextColorLight ">Due: {date}</p>
			</div>
			{/* <StarButton
        value={task.priority}
        clickHandler={() => {
          //   dispatch({
          //     type: ACTIONS.PRIORITY,
          //     payload: { id: task.id },
          //   });
        }}
      /> */}
		</>
	);
}
