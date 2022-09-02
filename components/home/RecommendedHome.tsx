import { ResourcesSVG } from "../../public/svgs/ResourcesSVG";

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
		image: "/images/RecommendedOne.jpeg",
		title:
			"The 2 best gadgets for drawing a curly line (spoiler: it will cost you a fortune)",
		recommendationCount: "3001",
	},
	{
		key: 2,
		link: "#2",
		image: "/images/RecommendedTwo.jpeg",
		title: "Pinching an image has never been easier with this simple trick",
		recommendationCount: "2581",
	},
	{
		key: 3,
		link: "#3",
		image: "/images/RecommendedThree.jpeg",
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
			<div className="flex h-full w-full flex-col items-center gap-y-3 px-1">
				<div>
					<a href={link}>
						<img className="cover rounded" src={image} />
					</a>
				</div>
				<div className="flex flex-row justify-between">
					<div className="flex w-4/5 ">
						<h3 className="font-bodyText text-xs font-medium text-customTextColorMedium ">
							<a href={link}>{title}</a>
						</h3>
					</div>
					<div className="flex w-1/5 flex-row items-baseline justify-end gap-1">
						<div className="flex h-3 self-baseline fill-customTextColorLight">
							<ResourcesSVG />
						</div>
						<p className="font-bodyText text-xs text-customTextColorLight">
							{recommendationCount}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
