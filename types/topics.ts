import { Tasks } from "./tasks";


export type Topic = {
    title: string;
    id: number;
    complete: boolean;
    tasks: [...Tasks];
  };
  
  export type Topics = Topic[];