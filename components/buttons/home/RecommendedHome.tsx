import Link from "next/link";
import { ResourcesSVG } from "../../../public/svgs/ResourcesSVG";

interface RecommendedItem {
	key: number;
	link: string;
	image: string;
	title: string;
	recommendationCount: string;
}

const items: RecommendedItem[] = [
	{
		key: 1,
		link: "#1",
		image: "RecommendedOne.jpeg",
		title:
			"The 2 best gadgets for drawing a curly line (spoiler: it will cost you a fortune)",
		recommendationCount: "3001",
	},
	{
		key: 2,
		link: "#2",
		image: "RecommendedTwo.jpeg",
		title: "Pinching an image has never been easier with this simple trick",
		recommendationCount: "2581",
	},
	{
		key: 3,
		link: "#3",
		image: "RecommendedThree.jpeg",
		title: "“Look, I can draw shapes”, is what this person wants to tell us",
		recommendationCount: "2338",
	},
];

export function RecommendedHome() {
	return (
		<>
			<h3 className="card-heading">Recommended For You</h3>
			<div className="flex flex-row gap-4 px-2">
				{items.map((item) => (
					<RecommendedItem {...item} />
				))}
			</div>
		</>
	);
}

interface ItemProps extends RecommendedItem {}

function RecommendedItem({
	image,
	link,
	title,
	recommendationCount,
}: ItemProps) {
	return (
		<>
			<div className="flex flex-col items-center w-full h-full px-1 gap-y-3">
				<div>
					<a href={link}>
						<img className="rounded cover" src={image} />
					</a>
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex w-4/5 ">
						<h3 className="text-xs font-medium font-bodyText text-customTextColorMedium ">
							<Link href={link}>{title}</Link>
						</h3>
					</div>
					<div className="flex flex-row items-baseline justify-end w-1/5 gap-1">
						<div className="flex h-3 self-baseline fill-customTextColorLight">
							<ResourcesSVG />
						</div>
						<p className="text-xs font-bodyText text-customTextColorLight">
							{recommendationCount}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
