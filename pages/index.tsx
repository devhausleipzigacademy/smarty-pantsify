import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { RecommendedHome } from "../components/buttons/home/RecommendedHome";
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
			fetch(`http://localhost:3000/api/users/${userId}`).then((res) =>
				res.json()
			),
		{ enabled: Boolean(userId) }
	);
	if (userLoading) return <p>Loading</p>;
	if (!userLoading && user === undefined) return <p>user not found</p>;
	return (
		<div className="flex h-full w-full flex-col gap-4">
			<h2 className=" text-2xl font-light ">Welcome back, {user.name}!</h2>

			<div id="upperElements" className="flex h-80 w-full flex-row gap-4 ">
				{/* <div id="upcomingTasks" className=" card-style h-full w-2/3">
					<TaskListHome />
				</div>
				<div id="statusBoard" className="card-style h-full  w-1/3">
					<StatusHome />
				</div> */}
			</div>
			<div id="recommendedBlogposts" className="card-style h-96 w-full">
				<RecommendedHome />
			</div>
		</div>
	);
};

export default Home;
