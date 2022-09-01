import clsx from "clsx";
import { useState } from "react";
import { InitialTask, initialTask, yesterday } from "../types/TypesNConsts";
import { useTracks } from "../utilities/axios";
import { ToggleSwitch } from "./buttons/ToggleSwitch";

export function TaskForm() {
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState<InitialTask>(initialTask);
  // const dispatch = useTasksDispatch() as CreateContext;
  const tracks = useTracks();
  const topics =
    tracks.find((track) => track.id === parseInt(userInput.track))?.topics ??
    [];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const body = JSON.stringify(userInput);
      const result = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body,
      }).then((res) => res.json());
      console.log("success", result);
    } catch (e) {
      console.error(e);
      return;
    }
    // dispatch({ type: ACTIONS.ADD_TASK, payload: { userInput: userInput } });
    setError("");
    setUserInput(initialTask);
    const calendar = document.getElementById(
      "deadline-calendar"
    ) as HTMLInputElement;
    calendar.value = calendar.defaultValue;
  }

  return (
    <>
      <div className="flex h-full w-full flex-col p-2">
        <h2 className="self-start">Add Task</h2>
        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col justify-evenly gap-6 p-6 placeholder:text-customTextColorLight"
        >
          <input
            required
            className="rounded-md border p-1 pl-4"
            type="text"
            placeholder="Name*"
            name="name"
            value={userInput.name}
            onChange={(event) => {
              setUserInput({ ...userInput, name: event.target.value });
            }}
          />
          <input
            required
            name="deadline"
            value={JSON.stringify(userInput.deadline).slice(1, 11)}
            onChange={(event) => {
              setUserInput({
                ...userInput,
                deadline: new Date(event.target.value),
              });
            }}
            // a little magic to prevent setting past deadline
            min={JSON.stringify(yesterday).slice(1, 11)}
            type="date"
          />
          {error && <p className="error text-red-500   ">{error}</p>}
          <select
            className={clsx(
              !userInput.track
                ? "text-customTextColorLight"
                : "text-customTextColorDark"
            )}
            name="track"
            placeholder="Select Track"
            required
            id="track"
            value={userInput.track}
            onMouseDown={() => {
              setError("");
            }}
            onChange={(event) => {
              setUserInput({ ...userInput, track: event.target.value });
            }}
          >
            <option disabled value="">
              Select Track
            </option>
            {tracks.map((element, idx) => (
              <option key={idx} value={element.id}>
                {element.title}
              </option>
            ))}
          </select>
          {userInput.track && (
            <select
              name="Topic"
              className={clsx(
                !userInput.topic
                  ? "text-customTextColorLight"
                  : "text-customTextColorDark"
              )}
              required
              id="topic"
              value={userInput.topic}
              onMouseDown={() => {
                setError("");
              }}
              onChange={(event) => {
                setUserInput({ ...userInput, topic: event.target.value });
              }}
            >
              <option disabled value="">
                Select Topic
              </option>
              {topics.map((element, idx) => (
                <option key={idx} value={element.id}>
                  {element.title}
                </option>
              ))}
            </select>
          )}

          <textarea
            placeholder="Description"
            name="description"
            value={userInput.description}
            onChange={(event) => {
              setUserInput({ ...userInput, description: event.target.value });
            }}
          />
          <div className="flex justify-between">
            <div
              id="priorityInputAndLabel"
              className="-mt-6 flex items-center gap-2"
            >
              <ToggleSwitch
                clickHandler={() => {
                  setUserInput({ ...userInput, priority: !userInput.priority });
                }}
                value={userInput.priority}
              />
            </div>
            <button
              className="flex bg-transparent text-customTextColorMedium"
              type="submit"
            >
              Reset
            </button>
            <button
              className="flex h-2 w-24 items-center justify-center self-end justify-self-end rounded-xl bg-primary p-6 text-customTextColorDark"
              type="submit"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
