import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Track } from "@prisma/client";
import { useTracks } from "../../hooks/useTracks";
import { randomize } from "../../utilities/randomize";
import { Post } from "../../components/feeds/Post";

export default function Feed() {
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("All");
	const { data: tracks, isLoading: tracksLoading } = useQuery<Track>(
		["tracks"],
		() => fetch("/pages/api/track").then((res) => res.json())
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
					fetch(`${redditUrl}?limit=20&q=${title}&top`).then((res) => res.json())
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
		// console.log(feed);
	}, [feed]);

	return (
		<div className="">
			<Link href="../resources">
				<a> ssssssssssssssadasdas</a>
			</Link>
			{/* <Youtube /> */}
			<div className="flex flex-row items-end justify-between mt-10">
				<div className="relative inline-block w-64">
					<p>Filter by Tracks</p>
					{tracksLoading ? (
						<p>Tracks Loading...</p>
					) : (
						<select
							onChange={(e) => {
								setQuery(e.target.value);
							}}
							className="w-full px-4 py-2 pr-8 leading-tight rounded shadow appearance-none focus:shadow-outline focus:outline-none"
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
					<div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
						<svg
							className="h-6 mt-6 text-black text w-9 fill-black"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
						>
							<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
						</svg>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="w-full max-w-sm">
					<div className="flex items-center py-2 border-b border-teal-500">
						<input
							onChange={handleInput}
							className="w-full px-2 py-1 mr-3 font-medium leading-tight text-gray-800 bg-transparent border-none appearance-none text-l focus:outline-none"
							type="search"
							placeholder=" Reddit/r/..."
						/>
						<button
							className="flex-shrink-0 px-2 py-1 text-sm text-white bg-teal-500 border-4 border-teal-500 rounded hover:border-teal-700 hover:bg-teal-700"
							type="submit"
						>
							Search
						</button>
					</div>
				</form>
			</div>

			<div className="relative flex flex-col items-center w-full h-full gap-20 pl-10 mt-20 no-scrollbar justify-evenly">
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
