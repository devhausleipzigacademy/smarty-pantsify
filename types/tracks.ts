import { Task } from "./tasks";
import { Topics } from "./topics";


export type Track = {
    title: string;
    id: number;
    complete: boolean;
    topics: [...Topics];
    tasksOpen?: Array<Task>;
    tasksFinished?: Array<Task>;
};

export type Tracks = Track[];