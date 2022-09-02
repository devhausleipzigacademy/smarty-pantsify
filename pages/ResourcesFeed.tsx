import { titleCase } from "title-case";
import { useResource } from "../hooks/useResources";

export function ResourcesFeed() {
	// TODO: fix useparams and turn to nextjs
	const { trackId } = useParams();
	const { data: resources, isLoading: resourcesLoading } = useResource(trackId);
	// TODO: once we have a track api and maybe a custom hook we can get the track name using the trackId

	if (resourcesLoading) return <p>Loading</p>;
	if (!resourcesLoading && resources === undefined)
		return <p>resources not found</p>;

	return (
		<div className="  flex flex-col items-center    gap-5   ">
			<h2 className="text-4xl font-bold">{titleCase(track!)}</h2>
			{resources.map((resource) => (
				<div key={resource.id} className="flex flex-col w-[50%]">
					<img src={resource.image} className=" rounded-lg h-full" />
				</div>
			))}
		</div>
	);
}
