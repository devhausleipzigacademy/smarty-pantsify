import { StatusSVG } from "../assets/Status";
import { useTasks } from "../hooks/useTasks";

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

  return (
    <>
      <h3 className="card-heading">Your Progress</h3>
      <div className="flex h-5/6 w-full flex-col items-center justify-between gap-2 p-4">
        <StatusSVG progress={taskCompletionPercentage} />

        <p className="w-7/12 text-center text-xs">{completionMessage}</p>
      </div>
    </>
  );
}
