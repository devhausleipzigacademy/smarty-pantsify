import { createContext, useContext, useReducer } from "react";

import { v4 as uuid } from "uuid";
import {
  Action,
  ChildrenProps,
  CreateContext,
  Task,
  Tasks,
} from "../types/TypesNConsts";
import { useTasks } from "../utilities/axios";

export const TasksContext = createContext<Tasks>([]);
export const TasksDispatchContext = createContext<CreateContext | null>(null);

export function TasksProvider({ children }: ChildrenProps) {
  const taskstemp = useTasks();
  const [tasks, dispatch] = useReducer(tasksReducer, taskstemp);
  console.log("tasks: " + tasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasksReducer() {
  return useContext(TasksContext);
}

// TODO Tasksprovider not working, fix infinite rerendering bug, check insertion of ususer in usereducer
export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}

export const ACTIONS = {
  ADD_TASK: "add-task",
  CHANGE_DEADLINE: "change deadline",
  COMPLETED: "completed",
  CHANGE_TOPIC: "change topic",
  CHANGE_NAME: "change name",
  DELETE: "delete",
  CONFIRM_CHANGE: "confirm change",
  PRIORITY: "toggle priority",
};

function tasksReducer(tasks: Tasks, action: Action): Tasks {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...tasks, newTask(action.payload.userInput)];
    case ACTIONS.CHANGE_DEADLINE:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, deadline: action.payload.deadline };
        } else return task;
      });
    case ACTIONS.CHANGE_NAME:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, name: action.payload.name };
        } else return task;
      });
    case ACTIONS.CHANGE_TOPIC:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, topic: action.payload.topic };
        } else return task;
      });
    case ACTIONS.PRIORITY:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, priority: !task.priority };
        } else return task;
      });
    case ACTIONS.COMPLETED:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, completed: !task.completed };
        } else return task;
      });
    case ACTIONS.DELETE:
      return tasks.filter((task) => task.id !== action.payload.id);
    default:
      return tasks;
  }
}

function newTask(userInput: Task): Task {
  return {
    id: uuid(),
    name: userInput.name,
    deadline: userInput.deadline,
    topic: userInput.topic,
    description: userInput.description,
    priority: userInput.priority,
    completed: false,
  };
}
