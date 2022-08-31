import clsx from "clsx";
import { useEffect, useState } from "react";

let redditUrl = "https://www.reddit.com/";

interface Props {
	data: any;
	query: string;
}

export function Post({ data, query }: Props) {
	return (
		<div>
			<div className="flex justify-between">
				<div className="flex items-center">
					<UpvoteIcon />
					<p className="text-xs">{data.ups} times up voted </p>
				</div>
				<div className="flex">
					<p className="self-end text-2xs">{data.subreddit_name_prefixed}</p>
					<BookmarkButton data={data} query={query} />
				</div>
			</div>
			<div className="relative flex flex-col h-full p-10 text-sm text-black bg-white border-2 border-black w-fit rounded-2xl border-opacity-40">
				<p className="  absolute top-1 text-[10px]">
					posted by u/{data.author}
				</p>
				<p className="font-medium ">{data.title}</p>
				<p>{data.selftext}</p>
				<a href={redditUrl + data.permalink}>
					<img
						className="absolute right-3 top-2 h-6 hover:scale-[105%]"
						src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png"
						alt=""
					/>
				</a>
				<img
					className="h-[30rem] self-center rounded-2xl p-4 "
					src={data.url_overridden_by_dest}
					alt=""
				/>
				<p>{data.selftext}</p>
				<a href={redditUrl + data.permalink}>
					<p className="mt-2 text-center hover:scale-[105%] hover:underline">
						{data.num_comments} <br /> comments{" "}
					</p>
				</a>
				<CommentIcon />
			</div>
		</div>
	);
}

// TODO: move to own component file
interface BookmarkButtonProps {
	query: string;
	data: any;
}

function BookmarkButton({ data, query }: BookmarkButtonProps) {
	const [postId, setPostId] = useState<number | null>(null);
	const isSaved = Boolean(postId);

	useEffect(() => {
		const permaLinkSafe = encodeURIComponent(data.permalink);
		fetch(`http://localhost:3000/resources?data.url=${permaLinkSafe}`)
			.then((res) => res.json())
			.then((res) => {
				if (res.length > 0) {
					setPostId(res[0].id);
				}
			});
	}, []);

	async function addResource() {
		if (!isSaved) {
			const body = JSON.stringify({
				data: {
					url: data.permalink,
					text: data.title,
					image: data.url_overridden_by_dest,
				},
				track: query.toLowerCase(),
			});
			console.log("no post found");
			const post = await fetch("http://localhost:3000/resources", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body,
			}).then((res) => res.json());
			setPostId(post.id);
		} else {
			console.log("post found", isSaved);
			await fetch(`http://localhost:3000/resources/${postId}`, {
				method: "DELETE",
			});
			setPostId(null);
		}
	}

	return (
		<button className="border-0" onClick={addResource}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="sav"
				className={clsx(
					"animate-tada ani h-9 w-10  border-white  duration-200 hover:scale-[120%]",
					"focus:animate-bounce active:fill-green-500",
					isSaved ? "fill-red-600" : "fill-gray-400"
				)}
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width=".5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
				/>
			</svg>
		</button>
	);
}

function UpvoteIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="w-6 h-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M7 11l5-5m0 0l5 5m-5-5v12"
			/>
		</svg>
	);
}

function CommentIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="self-center w-5 h-5"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}
