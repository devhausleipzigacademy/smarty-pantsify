import type { NextPage } from "next";
import { useContext } from "react";
import { RecommendedHome } from "../components/home/RecommendedHome";
import { StatusHome } from "../components/home/StatusHome";
import { TaskListHome } from "../components/home/TaskListHome";
import { useUser } from "../hooks/useUsers";
import { UserContext } from "../utilities/UserContext";


const Home: NextPage = () => {
	//TODO: Create auth so that we don't have to hard code here
	const user = useContext(UserContext)

	if (user === null) return <p>Error. Please check that the user is correctly configured.</p>

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
