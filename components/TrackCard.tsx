import { ClockSVG } from "../assets/Clock";
import { ListItemUncheckedSVG } from "../assets/ListItemUnchecked";
import { Progress } from "../assets/Progress";
import { StatusSVG } from "../assets/Status";
import { TopicsSVG } from "../assets/Topics";
import { useTasks } from "../hooks/useTasks";
import { Track } from "../types/tracks";
import { TaskListHome } from "./TaskListHome";

export const borderColorsArray = [
  "border-b-customYellowLight",
  "border-b-customGreenLight",
  "border-b-customPinkLight",
  "border-b-secondaryLight",
  "border-b-customPurpleLight",
];

type TrackListProps = {
  track: Track;
  colorId: number;
};

export function TrackCard({ track, colorId }: TrackListProps) {
  const trackCardBorder = `${borderColorsArray[colorId]}`;
  const classes = `flex p-3 rounded-t-md  justify-between items-center pb-2 gap-2 h-10 bg-greyTransparent max-w-4xl border-b-4 ${trackCardBorder}`;

  const tasks = useTasks(track.id);
  let totalTasks = tasks.length;
  let completedTasks = tasks.filter((task) => !!task.completed).length;
  let timeSpent = tasks.reduce(
    (acc, task) => acc + (task.timeSpentInMinutes || 0),
    0
  );

  const taskCompletionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="pb-7">
      <div id={track.id.toString()} className={classes}>
        <h2 className="pl-5 font-subheading text-sm font-medium text-customTextColorDark">
          {track.title}
        </h2>
      </div>

      <div className="flex h-20 max-w-4xl flex-row items-center justify-between rounded-b-md bg-white px-16 shadow ">
        <div className="flex h-11 w-fit flex-col items-center gap-2 ">
          <TopicsSVG />

          <p className="font-bodyText text-sm text-customTextColorDark ">
            {track.topics.length} Topics
          </p>
        </div>
        <div className="flex h-11 flex-col items-center gap-2">
          <ListItemUncheckedSVG />
          <p className="font-bodyText text-sm text-customTextColorDark ">
            {totalTasks} Tasks
          </p>
        </div>
        <div className="flex h-11 flex-col items-center gap-2">
          <Progress />
          <p className="font-bodyText text-sm text-customTextColorDark ">
            {Math.round(taskCompletionPercentage)}% done
          </p>
        </div>
        <div className="flex h-11 flex-col items-center gap-2">
          <ClockSVG />
          <p className="font-bodyText text-sm text-customTextColorDark ">
            {timeSpent} min spent
          </p>
        </div>
      </div>
    </div>
  );
}
