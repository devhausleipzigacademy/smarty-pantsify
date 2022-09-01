import { findTopic } from "../utilities/FinderFunctions";
import { CreateContext, TaskProp } from "../types/TypesNConsts";
import { ACTIONS, useTasksDispatch } from "./TasksContext";
import { Topic } from "../types/topics";
import { useTasks } from "../hooks/useTasks";

const cardColorsArray = [
	"bg-customYellowLight",
	"bg-customGreenLight",
	"bg-customPinkLight",
	"bg-secondaryLight",
	"bg-customPurpleLight",
];

type TopicListProps = {
	topic: Topic;
	colorId: number;
};

export function TopicCard({ topic, colorId }: TopicListProps) {
	// const tasksFound = selectedTopic.tasks;
	const topicCardColor = `${cardColorsArray[colorId]}`;
	const classes = `flex items-center w-52 h-8 ${topicCardColor} rounded-t-md`;

	const tasks = useTasks().filter((task) => task.topicId === topic.id);

	return (
		<div className="pb-7">
			<div id={topic.id.toString()} className={classes}>
				<h2 className="pl-5 text-sm font-medium font-subheading text-customTextColorDark ">
					{topic.title}
				</h2>
			</div>

			<ul>
				{tasks
					.filter((task) => !task.completed)
					.map((task) => (
						<li
							key={task.id}
							className="flex items-center justify-between max-w-5xl gap-2 p-3 bg-white border-b border-r rounded-sm h-9 "
						>
							<TaskItem task={task} />
						</li>
					))}

				{/* <li
          key={uuid()}
          className="flex items-center justify-between max-w-5xl gap-2 p-3 bg-white border-b border-r rounded-t-sm rounded-b-md h-9"
        >
          <AddTaskItem trackId={trackId} topicId={topicId} />
        </li> */}
			</ul>
		</div>
	);
}

function TaskItem({ task }: TaskProp) {
	// I will probably need these here
	const dispatch = useTasksDispatch() as CreateContext;

	const date = JSON.stringify(task.deadline).slice(1, 11);

	return (
		<div className="flex flex-row items-center w-full h-full gap-5">
			<input
				type="checkbox"
				name="completed"
				onChange={() => {
					dispatch({ type: ACTIONS.COMPLETED, payload: { id: task.id } });
				}}
			/>

			<p className="text-xs">{task.name}</p>

			<p className="text-xs text-customTextColorLight ">Due: {date}</p>
		</div>
	);
}

// function AddTaskItem({ topicId }: TopicListProps) {
//   const [userInput, SetUserInput] = useState({
//     name: "",
//     deadline: now,
//   });
//   const [taskNameConfirmed, SetTaskNameConfirmed] = useState(false);
//   const [taskDeadlineConfirmed, SetTaskDeadlineConfirmed] = useState(false);
//   const dispatch = useTasksDispatch() as CreateContext;

//   return (
//     <>
//       <div className="flex flex-row items-center w-full h-full gap-5 ">
//         <input disabled type="checkbox" name="completed" />
//         <input
//           placeholder="Add task"
//           type="text"
//           required
//           className="text-xs text-customTextColorDark font-bodyText"
//           value={userInput.name}
//           onChange={(event) => {
//             SetTaskNameConfirmed(true);
//             SetUserInput({ ...userInput, name: event.target.value });
//           }}
//         />
//         <input
//           type="date"
//           required
//           className={
//             taskNameConfirmed
//               ? "text-xs text-customTextColorLight font-bodyText"
//               : "invisible"
//           }
//           value={JSON.stringify(userInput.deadline).slice(1, 11)}
//           onChange={(event) => {
//             SetUserInput({
//               ...userInput,
//               deadline: new Date(event.target.value),
//             });
//             SetTaskDeadlineConfirmed(true);
//           }}
//         />
//         <button
//           type="button"
//           className={
//             taskDeadlineConfirmed
//               ? "min-w-min h-5 bg-primary rounded-md relative"
//               : "invisible"
//           }
//           onClick={() => {
//             dispatch({
//               type: ACTIONS.ADD_TASK,
//               payload: { userInput: userInput },
//             });
//           }}
//         >
//           <span className="flex items-center justify-center px-4 text-xs font-bodyText text-customTextColorDark">
//             Add Task
//           </span>
//         </button>
//       </div>
//     </>
//   );
// }
