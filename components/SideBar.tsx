import Link from "next/link";
import { FeedSVG } from "../public/assets/FeedSVG";
import { HomeSVG } from "../public/assets/HomeSVG";
import { ResourcesSVG } from "../public/assets/ResourcesSVG";
import { TracksSVG } from "../public/assets/TracksSVG";

import { useTracks } from "../utilities/axios";
import { Timer } from "./Timer";

interface NavigationItem {
	url: string;
	label: string;
	icon: JSX.Element;
}

const navigation: NavigationItem[] = [
	{
		url: "/",
		label: "Home",
		icon: <HomeSVG />,
	},
	{
		url: "/feed",
		label: "Feed",
		icon: <FeedSVG />,
	},
	{
		url: "/resources",
		label: "Resources",
		icon: <ResourcesSVG />,
	},
];

export default function SideBar() {
	const tracks = useTracks();

	const tracksList = tracks.map((track, idx) => (
		<li key={idx}>
			<Link href={`/tracks/${track.id}`}>{track.title}</Link>
		</li>
	));
	// TODO: put navigation into Array to make Navlink more maintainable

	return (
		<div className="flex flex-col justify-between h-full w-fit">
			<div className="flex flex-col gap-y-6">
				<nav className="flex flex-col items-start w-full gap-6 p-6 shadow-md h-fit rounded-xl bg-whiteTransparent">
					{navigation.map((item) => (
						<Link
							key={item.url}
							className="flex flex-row h-5 gap-6 navlink text-customTextColorDark"
							href={item.url}
						>
							{item.icon} {item.label}
						</Link>
					))}
				</nav>
				<div className="flex flex-col items-start w-full gap-2 p-6 shadow-md h-fit rounded-xl bg-whiteTransparent">
					<Link
						className="flex flex-row h-5 gap-6 navlink text-customTextColorDark "
						href="/tracks"
					>
						<TracksSVG /> Tracks
					</Link>
					<ul className="relative leading-7 left-12 text-customTextColorDark ">
						{tracksList}
					</ul>
				</div>
			</div>

			<div className="h-fit w-fit">
				<Timer />
			</div>
		</div>
	);
}
