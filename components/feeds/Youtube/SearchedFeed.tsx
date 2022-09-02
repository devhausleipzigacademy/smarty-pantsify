import { useEffect, useState } from "react";
import { Task } from "../../../types/TypesNConsts";
import { data } from "autoprefixer";
import { Searchbar } from "../SearchBar";
import { setInterval } from "timers/promises";
import { Youtube } from "./YoutubeConfig";
import { moveCursor } from "readline";
import { taskDummy, tasksDummies } from "../../../database/Dummies";

export default function SearchedFeed({ task }: any) {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("horse");
  const [limit, setLimit] = useState("33");

  useEffect(() => {
    fetch(`https://www.reddit.com/search.json?limit=${limit}&q=${query}&count=2
		`).then((result) => {
      if (result.status != 200) {
        // console.log("ERRPORR, BRUVVV");
      }
      result.json().then((datas) => {
        if (datas != null) {
          setArticles(datas.data.children);
        }
      });
    });
  }, [query]);

  function searchBar(e: any) {
    setSearch(e.target.value);
    e.preventDefault();
  }
  function submit(event: any) {
    event.preventDefault();
    setQuery(search);
  }

  let display = "";

  function dropDown() {
    const drop = document.getElementById("dropDown");
  }

  const [opacity, setOpacity] = useState("100");
  return (
    <div className=" ">
      <Youtube />
      <div>
        <p>{taskDummy.name}</p>
      </div>

      <div className="flex flex-row mt-10 items-end justify-end">
        <div className="inline-block   relative w-64">
          <select className=" appearance-none w-full  px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            <p>tasks</p>
            <option> 2</option>
            <option> 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-black text-black h- w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <form onSubmit={submit} className="w-full max-w-sm">
          <div className="flex items-center  border-b border-teal-500 py-2">
            <input
              onChange={searchBar}
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
        {articles
          .filter((post) => !post.data.is_gallery)
          .map((post) => (
            <>
              {post.data.is_video && !post.data.media.is_gif ? (
                <div className="flex flex-1  hover:scale-[10px] flex-col h-56 bg-gray-300 bg-opacity-40 rounded-xl w-fit items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6   duration-200 hover:fill-green-500 self-end  active:fill-purple-400 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  <video
                    className="rounded-lg h-[calc(100vh-20rem)]   w-full "
                    controls
                    src={post.data.media.reddit_video.fallback_url}
                  />{" "}
                  <p className="my-2 text-lg border-b-2 mx-1 ">
                    {post.data.title}
                  </p>
                  <a href={post.data.url}>
                    <button className="h-fit w-fit bg bg-purple-400 rounded-md border-2 font-subheading font-light border-opacity-40 hover:border-2 hover:border-green-400 p-2 my-2  scale-100 border-black px-1">
                      {" "}
                      Take Me To The Link
                    </button>
                  </a>
                </div>
              ) : (
                <div className="flex flex-1    h-[calc(100vh-15rem)] flex-row grow ">
                  <div className="flex flex-col  relative ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6  hover:scale-[100.8%] duration-200 z-10 top-5 left15  place-self-end  hover:fill-green-400  active:fill-purple-400 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    <iframe
                      className="border-2    relative  rounded-2xl flex   "
                      id="reddit-embed embed-responsive"
                      src={`https://www.redditmedia.com/${post.data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true;&autoplay=false`}
                      sandbox="allow-scripts allow-orientation-lock allow-same-origin"
                      height="500"
                      width="900"
                      do-not-allow="autoplay"
                      scrolling="no"
                    ></iframe>
                  </div>
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}

// 	<div className="relative">
// <svg xmlns="http://www.w3.org/2000/svg" className="h-6 hover:fill-green-400 active:fill-purple-500 right-12 top-5 z-10 absolute w-6" fill="gray" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
// </svg>
// 	<iframe className="border-2 relative hover:scale-[100.8%] duration-200 rounded-xl flex  border-black border-opacity-25   shadow-inner shadow-black " id="reddit-embed embed-responsive"  src={`https://www.redditmedia.com/${x.data.permalink}?ref_source=embed&amp;ref=share&amp;embed=true;&autoplay=false` } sandbox="allow-scripts allow-orientation-lock allow-same-origin"  height="600" width="900"   do-not-allow="autoplay" scrolling="no"></iframe>

//

// </div>
//))}
