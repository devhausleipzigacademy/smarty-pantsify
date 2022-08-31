import Link from "next/link";
import { useEffect, useState } from "react";

// import { dbAxios } from "../utilities/axios";

export default function index() {
	const [groups, setGroups] = useState({});

	// useEffect(() => {
	// 	try {
	// 		(async () => {
	// 			const resources = await dbAxios.get("/resources");
	// 			const groups = groupBy(resources.data, "track");
	// 			setGroups(groups);
	// 		})();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, []);

	return (
		<div className="grid grid-flow-col grid-cols-3 grid-rows-2 gap-5 ">
			{Object.entries<any[]>(groups).map(([track, resourcesArr]) => (
				<div
					key={track}
					id={track.indexOf.toString()}
					className="relative grid w-full p-2 rounded-xl bg-slate-200"
				>
					<button className="absolute text-2xl font-bold rounded-full right-4 top-2">
						x
					</button>
					<div className="flex flex-row items-center gap-x-3 ">
						<h1 className="mb-5 ml-2 text-3xl">{track}</h1>
						<p className="text-xs">{track.length} items</p>
					</div>
					<div className="grid grid-cols-4 grid-rows-4 gap-5 p-1 bg-blue-300 rounded-lg h-fit">
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
						<button className="self-end px-6 py-2 my-5 bg-orange-400 w-fit rounded-xl ">
							See All
						</button>
					</Link>
				</div>
			))}
		</div>
	);
}
