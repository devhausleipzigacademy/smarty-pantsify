import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Post } from "../../components/post";
import { Tracks } from "../../types/tracks";
import { useTracks } from "../../utilities/axios";
import { randomize } from "../../utilities/randomize";

export default function Feed() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("All");
  const { data: tracks, isLoading: tracksLoading } = useQuery<Tracks>(
    ["tracks"],
    () => fetch("http://localhost:3000/api/tracks").then((res) => res.json())
  );

  const limit = "100";

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const redditUrl = "https://api.reddit.com/search.json";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setQuery(search);
  }

  async function getFeed() {
    if (query === "All") {
      if (!tracks) return;
      const searchResults = await Promise.all(
        tracks.map(({ title }) =>
          fetch(`${redditUrl}?limit=20&q=${title}&top`).then((res) =>
            res.json()
          )
        )
      );

      const posts = searchResults.map((response) => {
        return response.data.children;
      });

      return randomize(posts.flat());
    } else {
      const searchResults = await fetch(
        `${redditUrl}?limit=${limit}&q=${query}&top`
      ).then((res) => res.json()); // const tracks: Tracks = [];
      return searchResults.data.children;
    }
  }

  const { data: feed, isLoading } = useQuery<any[]>(["feed"], getFeed, {
    enabled: !!tracks?.length,
  });

  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return (
    <div className=" ">
      {/* <Youtube /> */}
      <div className="mt-10 flex flex-row items-end justify-between">
        <div className="relative   inline-block w-64">
          <p>Filter by Tracks</p>
          {tracksLoading ? (
            <p>Tracks Loading...</p>
          ) : (
            <select
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className=" focus:shadow-outline w-full appearance-none rounded px-4 py-2 pr-8 leading-tight shadow focus:outline-none"
            >
              <option disabled value="">
                Select Track
              </option>
              <option value="All">All</option>
              {tracks &&
                tracks.map((track: any) => (
                  <option key={track.id} value={track.title}>
                    {track.title}
                  </option>
                ))}
            </select>
          )}
          <div className="pointer-events-none absolute  inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="text mt-6 h-6 w-9 fill-black text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="flex items-center  border-b border-teal-500 py-2">
            <input
              onChange={handleInput}
              className="text-l mr-3 w-full appearance-none border-none  bg-transparent py-1 px-2 font-medium leading-tight text-gray-800 focus:outline-none"
              type="search"
              placeholder=" Reddit/r/..."
            />
            <button
              className="flex-shrink-0 rounded
                          border-4 border-teal-500 bg-teal-500 py-1 px-2 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="no-scrollbar  relative mt-20  flex h-full w-full flex-col items-center justify-evenly gap-20  pl-10">
        {/* TODO:Add Loading State */}
        {/* TODO:Nothing found state */}
        {feed &&
          feed
            // TODO: Type your shit
            .filter((post: any) => post.data.post_hint === "image")
            .filter((post) => post.data.domain !== "i.imgur.com")
            .map((post: any) => (
              <Post key={post.data.id} data={post.data} query={query} />
            ))}
      </div>
    </div>
  );
}
