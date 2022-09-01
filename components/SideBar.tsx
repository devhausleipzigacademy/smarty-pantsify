import Link from "next/link";
import { HomeSVG } from "../public/assets/HomeSVG";
import { ResourcesSVG } from "../public/assets/ResourcesSVG";

import { TracksSVG } from "../public/assets/TracksSVG";
import { FeedSVG } from "../public/FeedSVG";

import { useTracks } from "../utilities/axios";
import { Timer } from "./Timer";

interface NavigationItem {
	url: string;
	label: string;
	icon: any;
}

const navigation: NavigationItem[] = [
	{
		url: "/",
		label: "Home",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		),
	},
	{
		url: "/feed",
		label: "Feed",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
				/>
			</svg>
		),
	},
	{
		url: "/resources",
		label: "Resources",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
				/>
			</svg>
		),
	},
];

export default function SideBar() {
	const tracks = useTracks();

	// const track = { `/data/trackDummies.js` };

	const tracksList = tracks.map((track: any, idx: any) => (
		<li key={idx}>
			<Link href={`/tracks/${track.id}`}>{track.title}</Link>
		</li>
	));
	console.log("trackslist:" + tracks);
	// TODO: put navigation into Array to make Navlink more maintainable

	return (
		<div className="flex flex-col justify-between h-full w-fit">
			<div className="flex flex-col gap-y-6">
				<div className="flex flex-col items-start w-full gap-6 p-6 shadow-md h-fit rounded-xl bg-whiteTransparent">
					{navigation.map((item) => (
						<Link
							key={item.url}
							className="flex flex-row h-5 gap-6 text-customTextColorDark"
							href={item.url}
						>
							<a className="flex gap-5">
								{item.icon} {item.label}
							</a>
						</Link>
					))}
				</div>
				<div className="flex flex-col items-start w-full gap-2 p-6 shadow-md h-fit rounded-xl bg-whiteTransparent">
					<Link
						className="flex flex-row items-center h-5 gap-6 text-customTextColorDark "
						href="/tracks"
					>
						<a className="flex flex-row self-start gap-7 h-7">
							<TracksSVG />
							<p>Tracks</p>
						</a>
					</Link>
					<ul className="self-center text-customTextColorDark">
						<a className="">{tracksList}</a>
					</ul>
				</div>
			</div>

			<div className="h-fit w-fit">
				<Timer />
			</div>
		</div>
	);
}
