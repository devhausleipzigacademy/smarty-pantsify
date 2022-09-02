import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css";
import Head from "next/head";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
	const [formVisible, setFormVisible] = useState(false);

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
				<title>Camp 6 Frontend Project</title>
			</Head>

			<QueryClientProvider client={queryClient}>
				<div
					id="background"
					className="background-gradient-option1 fixed -z-10 h-screen w-screen  "
				></div>

				{/* <header className="flex flex-row justify-between shadow-md h-20 top-0 sticky w-screen      items-center gap-4 p-6 bg-whiteTransparent">
				<h1 className="logo font-bold text-2xl text-customTextColorDark">
					SmartyPantsify
				</h1>
				<div className="flex flex-row gap-8 ">
					<AddTaskButton
						clickHandler={() => {
							SetFormVisible(!formVisible);
						}}
					/>
					<ProfilePicture />
				</div>
			</header> */}

				<main className="flex  flex-row justify-between w-full h-[calc(100vh-7rem)] gap-6  p-6">
					{/* <div className="flex flex-col justify-between">
					<SideBar />
				</div> */}

					<div className="w-full">
						{" "}
						<Component {...pageProps} />
					</div>
				</main>
			</QueryClientProvider>
		</>
	);
}
