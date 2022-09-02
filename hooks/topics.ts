import { Topic } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTopic(topicId: string) {
  return useQuery(
    ["topic", topicId],
    () =>
      fetch(`http://localhost:3000/api/topic/${topicId}`).then((res) =>
        res.json()
      ),
    { enabled: Boolean(topicId) }
  );
}

type TopicPrePrisma = {
  title: String;
  completed: Boolean;
  image: String;
  trackId: String;
};

export function useTopics() {
  return useQuery<Topic[]>(["topics"], () =>
    fetch("http://localhost:3000/api/topic").then((res) => res.json())
  );
}

export function useCreateTopic() {
  const queryClient = useQueryClient();
  return useMutation(
    ["topics", "create"],
    (topic: TopicPrePrisma) => {
      return fetch("http://localhost:3000/api/topic", {
        method: "POST",
        body: JSON.stringify(topic),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["topics"]);
      },
    }
  );
}

export function useDeleteTopic(topicId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ["topics", topicId, "delete"],
    () =>
      fetch(`http://localhost:3000/api/topic/${topicId}`, {
        method: "DELETE",
      }),
    { onSuccess: () => queryClient.invalidateQueries(["topics"]) }
  );
}
