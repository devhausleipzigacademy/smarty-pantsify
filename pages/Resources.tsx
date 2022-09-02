import { prisma } from "@prisma/client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useResources } from "../hooks/useResources";

export default function Resources() {
	const [groups, setGroups] = useState({});
	const { data: resources, isLoading: resourcesLoading } = useResources();

	// Not sure if this is working as I am unfamiliar with lodash
	// useEffect(() => {
	// 	const resourceGroups = groupBy(resources, (resource) => resource.trackId);

	// 	setGroups(resourceGroups);
	// }, resources);

	if (resourcesLoading) return <p>Loading</p>;
	if (!resourcesLoading && resources === undefined)
		return <p>resources not found</p>;

	const resourcesGrouped = prisma.resource.groupBy({ by: ["taskId"] });

	return (
		<div className="  grid grid-flow-col   gap-5  grid-cols-3 grid-rows-2 ">
			{Object.entries<any[]>(groups).map(([track, resourcesArr]) => (
				<div
					key={track}
					id={track.indexOf.toString()}
					className="grid   w-full  p-2 relative rounded-xl bg-slate-200"
				>
					<button className="absolute right-4 text-2xl  font-bold rounded-full top-2">
						x
					</button>
					<div className="flex flex-row gap-x-3    items-center  ">
						<h1 className="text-3xl  mb-5 ml-2">{track}</h1>
						<p className="text-xs">{track.length} items</p>
					</div>
					<div className="grid rounded-lg  grid-cols-4 p-1 grid-rows-4 gap-5 h-fit  bg-blue-300">
						{resourcesArr
							.map((item, index) => (
								<img
									key={item.id}
									src={item.data.image}
									className={`h-full rounded-xl w-full ${
										index <= 2
											? "row-span-2 col-span-2"
											: "row-span-1 col-span-1"
									}`}
								/>
							))
							.splice(0, 7)}
					</div>
					<Link href={`/resources/${track.toLowerCase()}`}>
						<button className="py-2  px-6 w-fit rounded-xl my-5 self-end bg-orange-400 ">
							See All
						</button>
					</Link>
				</div>
			))}
		</div>
	);
}
