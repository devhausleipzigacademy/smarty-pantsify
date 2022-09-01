import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { RecommendedHome } from "../components/buttons/home/RecommendedHome";
import { StatusHome } from "../components/StatusHome";
import { TaskListHome } from "../components/TaskListHome";
import { User } from "../types/users";

const Home: NextPage = () => {
	//TODO: Create auth so that we don't have to hard code here
	const userId = 1234;
	const {
		data: user,
		isLoading: userLoading,
		error,
	} = useQuery<User>(
		["user", userId],
		() =>
			fetch(`http://localhost:3000/api/users/${userId}`).then((res) => res.json()),
		{ enabled: Boolean(userId) }
	);
	if (userLoading) return <p>Loading</p>;
	if (!userLoading && user === undefined) return <p>user not found</p>;
	return (
		<div className="flex flex-col w-full h-full gap-4">
			<h2 className="text-2xl font-light ">Welcome back, {user.name}!</h2>

			<div id="upperElements" className="flex flex-row w-full gap-4 h-80 ">
				<div id="upcomingTasks" className="w-2/3 h-full card-style">
					<TaskListHome />
				</div>
				<div id="statusBoard" className="w-1/3 h-full card-style">
					<StatusHome />
				</div>
			</div>
			<div id="recommendedBlogposts" className="w-full card-style h-96">
				<RecommendedHome />
			</div>
		</div>
	);
};

export default Home;
