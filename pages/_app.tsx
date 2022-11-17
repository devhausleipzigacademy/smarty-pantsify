import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import "../styles/globals.css";
import { AddTaskButton } from "../components/buttons/AddTaskButton";
import ProfilePicture from "../components/user/ProfilePicture";
import SideBar from "../components/sidebar/SIdebar";
import {UserContext} from "../utilities/UserContext"
import { useUser } from "../hooks/useUsers";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	// TODO: add user login 
	// default userId that works in tandem with database
const userId = "0a4246b2-ca98-47f2-bcde-7052f6b3905e";

	const { data: user, isLoading: userLoading, error: userError } = useUser(userId);

	const [formVisible, setFormVisible] = useState(false);

	if (userLoading) return <p>Loading</p>;

	if (userError) return <p>Error</p>;

	if (!userLoading && user === undefined) return <p>user not found</p>;
	

	return (
		<>
			<meta charSet="UTF-8" />
			<Head>
				{/* Fonts */}
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />

				<link
					href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital@0;1&family=Comfortaa:wght@600;700&family=Poppins:wght@300;400;500;700&display=swap"
					rel="stylesheet"
				/>

				{/* Fonts end */}
				<title>Smarty Pantsify – Camp 6 Frontend Project</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<UserContext.Provider value={user}>
				<div
					id="background"
					className="background-gradient-option1 fixed -z-10 h-screen w-screen "
				></div>

				<header className="flex flex-row justify-between shadow-md h-20 top-0 sticky w-screen items-center gap-4 p-6 bg-whiteTransparent">
				<h1 className="logo font-bold text-2xl text-customTextColorDark">
					SmartyPantsify
				</h1>
				<div className="flex flex-row gap-8 ">
					<AddTaskButton
						clickHandler={() => {
							setFormVisible(!formVisible);
						}}
					/>
					</div>
				<ProfilePicture />
				</header>

				<main className="flex flex-row justify-between w-full h-[calc(100vh-7rem)] gap-6 p-6">
					<div className="flex flex-col justify-between">
					<SideBar/>
				</div>

					<div className="w-full">
						<Component {...pageProps} />
					</div>
				</main>
				</UserContext.Provider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
}
