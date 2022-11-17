import React, { useState } from "react";

import  {FeedSVG}  from "../../public/svgs/FeedSVG";
import {HomeSVG}  from  "../../public/svgs/HomeSVG"
import  {ResourcesSVG}  from "../../public/svgs/ResourcesSVG";
import  {TracksSVG}  from "../../public/svgs/TracksSVG";
import {useTracks} from "../../hooks/useTracks"
import Link from "next/link";
import { Timer } from "../timer/Timer";
import { User } from "@prisma/client";
// import { Timer } from "../Timer";

interface NavigationItem {
  url: string;
  label: string;
  icon: JSX.Element;
}

const navigation: NavigationItem[] = [
  {
    url: "/",
    label: "Home",
    icon: <HomeSVG />,
  },
  {
    url: "/feed",
    label: "Feed",
    icon: <FeedSVG />,
  },
  {
    url: "/resources",
    label: "Resources",
    icon: <ResourcesSVG />,
  },
];

export default function SideBar() {
  const [timerEnabled, setTimerEnabled] = useState(true)
    const {data: tracks, isLoading: tracksLoading, isError: tracksError} = useTracks();
    

    if (tracksLoading) return <p>Loading...</p>
    if (tracksError) return <p>Error...</p>

  const tracksList = tracks.map((track, idx) => (
    <li key={idx}>
      <Link href={`/tracks/${track.id}`}>{track.title}</Link>
    </li>
  ));

  const pathSelector =  <div className="flex items-center justify-center">
    {/* TODO: finish setting up timer by fixing track selector here */}
         <select
          className="w-28 bg-transparent "
          required
          name="track"
          id="trackselector"
          value={timerValues.trackId}
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
  
  return (
    <div className="flex h-full w-fit  flex-col justify-between">
      <div className=" flex flex-col gap-y-6">
        <nav className="flex h-fit w-full  flex-col items-start gap-6 rounded-xl bg-whiteTransparent p-6 shadow-md">
          {navigation.map((item) => (
            <Link
              key={item.url}
              className="navlink flex h-5 flex-row gap-6 text-customTextColorDark"
              href={item.url}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex h-fit w-full flex-col items-start gap-2 rounded-xl bg-whiteTransparent p-6 shadow-md">
          <Link
            className="navlink flex h-5 flex-row gap-6 text-customTextColorDark "
            href="/tracks"
          >
            <TracksSVG /> Tracks
          </Link>
          <ul className="relative left-12 leading-7 text-customTextColorDark ">
            {tracksList}
          </ul>
        </div>
      </div>

      <div className="h-fit w-fit">
        {timerEnabled? <Timer task={task} resetTimer={resetTimer} /> : pathSelector }
      </div>
    </div>
  );
}

// TImer stuff

// Overlays to choose track, topic, and task, respectively

// const trackSelector = timerValues.trackId? (
//   <>
//     <div className="flex items-center justify-center">
//       <select
//         className="w-28 bg-transparent "
//         required
//         name="track"
//         id="trackselector"
//         value={timerValues.trackId}
//         onChange={(event) => {
//           dispatch({
//             type: ACTIONS.SET_TRACK,
//             payload: { trackId: event.target.value },
//           });
//           dispatch({ type: ACTIONS.SET_SELECTOR });
//         }}
//       >
//         <option disabled>select track</option>
//         {tracks.map((element, idx) => (
//           <option key={idx} value={element.id}>
//             {element.title}
//           </option>
//         ))}
//       </select>
//     </div>
//   </>
// ): (<p>No tracks found.</p>);
// const topicSelector = (
//   <>
//     <div className="flex items-center justify-center">
//       <select
//         className="w-28 bg-transparent"
//         required
//         name="topic"
//         id="topicelector"
//         value={timerValues.topic}
//         onChange={(event) => {
//           dispatch({
//             type: ACTIONS.SET_TOPIC,
//             payload: { topicId: event.target.value },
//           });
//           dispatch({ type: ACTIONS.SET_SELECTOR });
//         }}
//       >
//         <option disabled>select topic</option>
//         {findTrack(Number(timerValues.track))?.topics.map((element, idx) => (
//           <option key={idx} value={element.id}>
//             {element.title}
//           </option>
//         ))}
//       </select>
//     </div>
//   </>
// );
// const taskSelector = (
//   <>
//     <div className="flex items-center justify-center">
//       <select
//         className="w-28 bg-transparent "
//         required
//         name="task"
//         id="taskselector"
//         value={timerValues.task}
//         onChange={(event) => {
//           dispatch({
//             type: ACTIONS.SET_TASK,
//             payload: { taskId: event.target.value },
//           });
//           dispatch({ type: ACTIONS.SET_SELECTOR });
//         }}
//       >
//         <option disabled>select task</option>
//         {findTopic(
//           Number(timerValues.track),
//           Number(timerValues.topic)
//         )?.tasks.map((task, idx) => (
//           <option key={idx} value={task.id}>
//             {task.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   </>
// );