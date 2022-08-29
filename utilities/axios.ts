import axios from "axios";
import { useEffect, useState } from "react";
import { Tasks } from "../types/tasks";
import { Tracks } from "../types/tracks";
import { Task } from "../types/TypesNConsts";
import { User } from "../types/user";

export const dbAxios = axios.create({
  baseURL: "http://localhost:3000",
});

export const redditAxios = axios.create({
  baseURL: "https://www.reddit.com/search.json",
});

export function useTracks() {
  const [tracks, setTracks] = useState([] as Tracks);

  useEffect(() => {
    try {
      (async () => {
        const tracks = await dbAxios.get("/tracks");
        setTracks(tracks.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return tracks;
}

export function useUser(userId: number) {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    try {
      (async () => {
        const userResponse = await dbAxios.get(`/users/${userId}`);
        setUser(userResponse.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return user;
}

export function useTasks() {
  const [tasks, setTasks] = useState([] as Tasks);
  let taskTempArr: Array<Task> = [];
  const tracks = useTracks();
  tracks.map((track) =>
    track.topics.map((topic) =>
      topic.tasks.map((task) => taskTempArr.push(task))
    )
  );
  setTasks(taskTempArr);
  return tasks;
}

// export const useTasks = axios.create({
//   baseURL: 'http://localhost:3000',
// });
