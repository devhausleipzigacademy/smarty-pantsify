import React, { useEffect, useState } from "react";
import { Tracks } from "../../types/tracks";
import { dbAxios, redditAxios } from "../../utilities/axios";
import { randomize } from "../../utilities/randomize";
import { Post } from "./post";

export default function Feed() {
  const [tracks, setTracks] = useState([] as Tracks);
  const [articles, setArticles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("cats");

  const limit = "100";

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setQuery(search);
  }

  useEffect(() => {
    try {
      (async () => {
        if (query === "Random") {
          const tracks: Tracks = await dbAxios.get("/tracks");

          const searchResults = await Promise.all(
            tracks.map(({ title }) =>
              redditAxios.get(`?limit=20&q=${title}&top`)
            )
          );

          const posts = searchResults.map((response) => {
            return response.data.children;
          });

          setArticles(randomize(posts.flat()));
        } else {
          const searchResults = await redditAxios.get(
            `?limit=${limit}&q=${query}&top`
          );

          setArticles(searchResults.data.children);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, [query]);

  return (
    <div className=" ">
      {/* <Youtube /> */}
      <div className="flex flex-row mt-10 items-end justify-between">
        <div className="inline-block   relative w-64">
          <p>Filter by Tracks</p>
          <select
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className=" appearance-none w-full    px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Track</option>
            <option value="Random">Random</option>
            {tracks.map((track) => (
              <option value={track.title}>{track.title}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute  inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-black text-black text mt-6 h-6 w-9"
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
              className="appearance-none bg-transparent border-none w-full text-gray-800  text-l font-medium mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="search"
              placeholder=" Reddit/r/..."
            />
            <button
              className="flex-shrink-0 bg-teal-500
						hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex  relative flex-col  pl-10 h-full w-full mt-20 no-scrollbar items-center justify-evenly  gap-20">
        {/* TODO:Add Loading State */}
        {/* TODO:Nothing found state */}
        {articles
          // TODO: Type your shit
          .filter((post: any) => post.data.post_hint === "image")
          .filter((post) => post.data.domain !== "i.imgur.com")
          .map((post: any) => (
            <Post data={post.data} query={query} />
          ))}
      </div>
    </div>
  );
}
