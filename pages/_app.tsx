import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddTaskButton } from "../components/buttons/AddTaskButton";
import { ProfilePicture } from "../components/ProfilePicture";
import SideBar from "../components/SideBar";
import { TaskForm } from "../components/TaskForm";
import { CrossSVG } from "../public/assets/CrossSVG";
import "../styles/globals.css";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	const [formVisible, setFormVisible] = useState(false);

	return (
		<QueryClientProvider client={queryClient}>
			<div className="overflow-hidden App">
				<div
					id="background"
					className="fixed w-screen h-screen background-gradient-option2 -z-10 "
				></div>
				{formVisible ? <FormOverlay setFormVisible={setFormVisible} /> : null}
				<header className="flex items-center justify-between h-20 p-6 shadow-md bg-whiteTransparent">
					<h1 className="text-2xl font-bold logo text-customTextColorDark">
						SmartyPantsify
					</h1>
					<div className="flex gap-8">
						<AddTaskButton
							clickHandler={() => {
								setFormVisible(!formVisible);
							}}
						/>
						<ProfilePicture />
					</div>
				</header>

				<div className="flex h-[calc(100vh-7rem)] w-full justify-between gap-6 p-6">
					<SideBar />

					<main className="flex-1 overflow-auto">
						<Component {...pageProps} />;
					</main>
				</div>
				{/* <img
				className="p-28 "
				src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1"
				alt=""
			/> */}
			</div>
		</QueryClientProvider>
	);
}

interface FormOverlayProps {
	setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormOverlay({ setFormVisible }: FormOverlayProps) {
	return (
		<div className="fixed z-10 flex items-center justify-center w-screen h-screen bg-customTextColorLight text-customTextColorDark">
			<div className="absolute w-2/5 bg-white rounded-md card-style h-3/5 ">
				<button
					className="absolute left-[calc(100%-2.5rem)] top-6 h-3 w-3 "
					onClick={() => {
						setFormVisible(false);
					}}
				>
					{" "}
					<CrossSVG />{" "}
				</button>
				{/* <TasksProvider> */}
				<TaskForm />
				{/* </TasksProvider> */}
			</div>
		</div>
	);
}
